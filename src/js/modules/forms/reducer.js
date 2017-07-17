import {
  CREATE_ARTICLE,
  ADD_CONTRIBUTOR,
  REMOVE_CONTRIBUTOR,
} from './actionTypes'


  const initialState =
  {
    articles: [],
    sections:
      [
        {
          id: 1,
          name: "Arts and Entertainment",
          shortName: "A&E"
        },
        {
          id: 2,
          name: "News",
          shortName: "News"
        },
        {
          id: 3,
          name: "Photography",
          shortName: "Photo"
        }
      ],
    users:
      [
        {
          id: 1,
          name: "Nicholas",
          thumbnail: "https://avatars0.githubusercontent.com/u/7357863?v=3&s=40"
        },
        {
          id: 2,
          name: "Jason",
          thumbnail: "https://avatars1.githubusercontent.com/u/15334952?v=3&s=96"
        },
        {
          id: 3,
          name: "George",
          thumbnail: "https://avatars3.githubusercontent.com/u/22208219?v=3&s=96"
        },
        {
          id: 4,
          name: "Alex",
          thumbnail: "https://avatars0.githubusercontent.com/u/2142?v=3&s=96"
        },
        {
          id: 5,
          name: "Fred",
          thumbnail: "https://avatars1.githubusercontent.com/u/2520?v=3&s=96"
        }
      ],
    // Stores just the ids of the users. Will use selectors
    // to get the actual list of names
    contributors: []
};

  const reducer = (state={...initialState}, action)=>
  {
      switch(action.type)
      {
        case CREATE_ARTICLE :
          return { ...state, articlesList: [...state.articlesList, action.payload]}
        case ADD_CONTRIBUTOR :
          const users = state.users;
          const contributor = users.find(
            user => user.name === action.payload.contributorName
          );

          return {
            ...state,
            contributors: [ ...state.contributors, contributor.id ]
          };
        case REMOVE_CONTRIBUTOR:
          const contributors = state.contributors;
          const contributorIndex = contributors.indexOf(
            action.payload.contributorId
          );
          const newContributors = contributors.slice(0, contributorIndex).concat(
            contributors.slice(contributorIndex + 1)
          );
          return { ...state, contributors: newContributors };
        default:
              break;
      }

      return state;
  };

  export default reducer