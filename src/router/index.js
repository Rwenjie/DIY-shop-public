import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/home/Home";
import Profile from "../views/profile/Profile";
import MyStore from "../views/store/MyStore";
import CreateGood from "../views/exhibitGoods/CreateGood";
import Listing from "../views/store/childComps/Listing";
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/store',
    component: MyStore,
    children: [
      {
        path: '',
        redirect: '/store/listing'
      },
      {
        path: 'create',
        name:'CreateGood',
        component: CreateGood
      },
      {
        path: 'listing',
        component: Listing

      }]
  }

];

const router = createRouter({

  history: createWebHistory(),
  routes
});

export default router
