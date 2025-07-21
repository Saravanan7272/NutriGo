

export const highlightMatch = (text, query) => {
  const q = query.trim().toLowerCase();
  if (!q) return text;

  const regex = new RegExp(`(${escapeRegExp(q)})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};


function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


export const performSearch = (query, popularItems, restaurants) => {
  const q = query.trim().toLowerCase();
  if (!q) return { items: [], restaurants: [] };


  const isVegOnly = q.includes('veg only') || q.includes('vegetarian');
  const isNonVeg = q.includes('non veg') || q.includes('non-veg');
  const ratingMatch = q.match(/(\d+) star/);
  const minRating = ratingMatch ? parseFloat(ratingMatch[1]) : null;
  const cuisineMatch = q.match(/(indian|italian|american|chinese|mexican)/);
  const cuisineType = cuisineMatch ? cuisineMatch[1] : null;
  const areaMatch = q.match(/(anna nagar|t nagar|velachery|adyar|omr)/);
  const area = areaMatch ? areaMatch[1] : null;


  let isUnderPrice = null;
  let isAbovePrice = null;
  let priceRange = null;

  if (/under\s+(\d+)|less than\s+(\d+)|below\s+(\d+)/.test(q)) {
    const match = q.match(/(?:under|less than|below)\s+(\d+)/);
    isUnderPrice = parseInt(match[1]);
  } else if (/above\s+(\d+)|greater than\s+(\d+)|more than\s+(\d+)/.test(q)) {
    const match = q.match(/(?:above|greater than|more than)\s+(\d+)/);
    isAbovePrice = parseInt(match[1]);
  } else if (/between\s+(\d+)\s+(?:and|to)\s+(\d+)/.test(q)) {
    const match = q.match(/between\s+(\d+)\s+(?:and|to)\s+(\d+)/);
    priceRange = [parseInt(match[1]), parseInt(match[2])];
  }


  const matchedItems = popularItems.filter(item => {
    const name = item.name?.toLowerCase() || '';
    const category = item.category?.toLowerCase() || '';
    const description = item.description?.toLowerCase() || '';
    const itemArea = item.area?.toLowerCase() || '';


    const vegFilter = isVegOnly ? item.isVegetarian : true;
    const nonVegFilter = isNonVeg ? !item.isVegetarian : true;
    const priceFilter =
      (isUnderPrice !== null ? item.price <= isUnderPrice : true) &&
      (isAbovePrice !== null ? item.price >= isAbovePrice : true) &&
      (priceRange ? item.price >= priceRange[0] && item.price <= priceRange[1] : true);
    const ratingFilter = minRating ? item.rating >= minRating : true;
    const cuisineFilter = cuisineType ? category.includes(cuisineType) : true;
    const areaFilter = area ? itemArea.includes(area) : true;

    const basicMatch = name.includes(q) || category.includes(q) || description.includes(q) || itemArea.includes(q);


    const hasAnyFilter = isVegOnly || isNonVeg || isUnderPrice !== null || isAbovePrice !== null || priceRange || minRating || cuisineType || area;

    return hasAnyFilter
      ? vegFilter && nonVegFilter && priceFilter && ratingFilter && cuisineFilter && areaFilter
      : basicMatch;
  });


  const matchedRestaurants = restaurants.filter(restaurant => {
    const name = restaurant.name?.toLowerCase() || '';
    const address = restaurant.address?.toLowerCase() || '';
    const cuisine = Array.isArray(restaurant.cuisine) ? restaurant.cuisine : [restaurant.cuisine];
    const rating = restaurant.rating || 0;
    const restaurantArea = restaurant.area?.toLowerCase() || '';

    const vegFilter = isVegOnly ? restaurant.vegOptions : true;
    const priceFilter =
      (isUnderPrice !== null ? restaurant.avgPrice <= isUnderPrice : true) &&
      (isAbovePrice !== null ? restaurant.avgPrice >= isAbovePrice : true) &&
      (priceRange ? restaurant.avgPrice >= priceRange[0] && restaurant.avgPrice <= priceRange[1] : true);
    const ratingFilter = minRating ? rating >= minRating : true;
    const cuisineFilter = cuisineType ? cuisine.some(c => c?.toLowerCase().includes(cuisineType)) : true;
    const areaFilter = area ? restaurantArea.includes(area) : true;

    const basicMatch = name.includes(q) || address.includes(q) || cuisine.some(c => c?.toLowerCase().includes(q)) || restaurantArea.includes(q);

    const hasAnyFilter = isVegOnly || isNonVeg || isUnderPrice !== null || isAbovePrice !== null || priceRange || minRating || cuisineType || area;

    return hasAnyFilter
      ? vegFilter && priceFilter && ratingFilter && cuisineFilter && areaFilter
      : basicMatch;
  });

  return {
    items: matchedItems.slice(0, 50),
    restaurants: matchedRestaurants.slice(0, 50)
  };
};


export const getSuggestions = (query, items, restaurants) => {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const commonTags = [
    'veg only', 'non veg', 'under 200', 'under 300', 'under 500',
    'above 300', 'between 100 and 300', 'less than 400',
    '4 star', '5 star', 'italian', 'indian', 'american', 'chinese',
    'anna nagar', 't nagar', 'velachery', 'adyar', 'omr',
    'cheap', 'best rated'
  ];

  const itemNames = items.filter(i => i.name?.toLowerCase().includes(q)).map(i => i.name);
  const itemCategories = [...new Set(items.filter(i => i.category?.toLowerCase().includes(q)).map(i => i.category))];
  const restaurantNames = restaurants.filter(r => r.name?.toLowerCase().includes(q)).map(r => r.name);
  const restaurantAreas = [...new Set(restaurants.filter(r => r.area?.toLowerCase().includes(q)).map(r => r.area))];
  const matchedTags = commonTags.filter(tag => tag.includes(q));

  const allSuggestions = [
    ...matchedTags,
    ...itemNames,
    ...itemCategories,
    ...restaurantNames,
    ...restaurantAreas
  ];

  return [...new Set(allSuggestions)].slice(0, 8);
};
