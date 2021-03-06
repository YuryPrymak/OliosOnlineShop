import Vue from 'vue';
import Vuex from 'vuex';

import data from './data';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isNavCategoriesOpen: false,
    nav: [
      {
        url: '/',
        title: 'Home',
        iconName: 'nav/home.png',
        activeLinkIconName: 'nav/home-active.png'
      },
      {
        url: '/cart',
        title: 'Cart',
        iconName: 'nav/cart.png',
        activeLinkIconName: 'nav/cart-active.png'
      },
      {
        url: '/search',
        title: 'Search',
        iconName: 'nav/search.png',
        activeLinkIconName: 'nav/search-active.png'
      }
    ],
    categories: [],
    cart: []
  },
  getters: {
    nav(state) {
      return state.nav;
    },
    categoriesInfo(state) {
      return state.categories.map(category => {
        return {
          name: category.name,
          iconName: category.iconName,
          activeLinkIconName: category.activeLinkIconName
        };
      });
    },
    isNavCategoriesOpen(state) {
      return state.isNavCategoriesOpen;
    },
    categoryIconName(state) {
      return categoryName => state.categories.filter(category => category.name === categoryName)[0]
        .iconName;
    },
    searchProducts(state) {
      return name => {
        const result = [];

        state.categories.forEach(category => {
          const currentCategory = category.name;

          category.products.forEach(product => {
            const match = product.name.toLowerCase().match(name.trim().toLowerCase());
            const res = {
              ...product,
              category: currentCategory
            };

            if(match) {
              result.push(res);
            }
          });
        });

        return result;
      };
    },
    productsList(state) {
      return currentCategory => state.categories
        .filter(category => category.name === currentCategory)[0];
    },
    product(state) {
      return id => state.categories
        .map(category => category.products
          .filter(product => product.id === id))
        .filter(arr => arr.length !== 0)[0][0];
    },
    discountedPrice() {
      return (price, discountPercent) => {
        const discount = (price / 100) * discountPercent;
        return parseInt(price - discount, 10);
      };
    },
    recommendedProducts(state, getters) {
      return (categoryName, id) => {
        const recommendedProducts = getters.productsList(categoryName).products
          .filter(product => product.id !== id)
          .sort(() => Math.round(Math.random() * 100) - 50);

        return recommendedProducts.slice(0, 3);
      };
    },
    productMatch(state) {
      return id => {
        let productMatch = false;

        state.categories.forEach(category => {
          category.products.forEach(product => {
            const match = product.id === +id;

            if(match) {
              productMatch = true;
            }
          });
        });

        return productMatch;
      };
    },
    productInCart(state) {
      return id => state.cart.filter(product => product.id === id)[0];
    },
    cart(state) {
      return state.cart;
    }
  },
  mutations: {
    loadData(state, payload) {
      payload.forEach(category => state.categories.push(category));
    },
    showCategoriesNav(state) {
      state.isNavCategoriesOpen = true;
    },
    hideCategoriesNav(state) {
      state.isNavCategoriesOpen = false;
    },
    addToCart(state, payload) {
      let hasAlready = false;

      state.cart.forEach(product => {
        if(product.id === payload.id) {
          product.quantity += payload.quantity;
          hasAlready = true;
        }
      });

      if(!hasAlready) {
        state.cart.push(payload);
      }
    },
    removeFromCart(state, payload) {
      state.cart.forEach((product, i, cart) => {
        if(product.id === payload) {
          cart.splice(i, 1);
        }
      });
    }
  },
  actions: {
    loadData(store) {
      store.commit('loadData', data);
    },
    showCategoriesNav(store) {
      store.commit('showCategoriesNav');
    },
    hideCategoriesNav(store) {
      store.commit('hideCategoriesNav');
    },
    addToCart(store, payload) {
      store.commit('addToCart', payload);
    },
    removeFromCart(store, payload) {
      store.commit('removeFromCart', payload);
    }
  }
});
