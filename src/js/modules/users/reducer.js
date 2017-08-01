import {
  ADD_CONTRIBUTOR,
  REMOVE_CONTRIBUTOR,
  SAVE_ARTICLE_DATA
} from './actionTypes'

  const initialState = {
  currentUser: 0,
  list: [
    {
      id: 0,
      name: "Nicholas",
      thumbnail: "https://s3.amazonaws.com/stuy-spec-users-resized/resized-P6260148.JPG",
      largePhoto: "https://s3.amazonaws.com/stuy-spec-users/P6260148.JPG"
    },
    {
      id: 1,
      name: "Jason",
      thumbnail: "https://avatars1.githubusercontent.com/u/15334952?v=3&s=96"
    },
    {
      id: 2,
      name: "George",
      thumbnail: "https://avatars3.githubusercontent.com/u/22208219?v=3&s=96"
    },
    {
      id: 3,
      name: "Alex",
      thumbnail: "https://avatars0.githubusercontent.com/u/2142?v=3&s=96"
    },
    {
      id: 4,
      name: "Fred",
      thumbnail: "https://avatars1.githubusercontent.com/u/2520?v=3&s=96"
    }
  ]
  };

  const reducer = (state={...initialState}, action)=>
  {
      switch(action.type)
      {
        default:
              break;
      }

      return state;
  };

  export default reducer
