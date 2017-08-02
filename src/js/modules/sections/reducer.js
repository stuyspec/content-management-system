
// The reason sections are an array is because they're relatively small,
// so finding a section is not computationally difficult. Users, on the other
// hand are really large so finding a user shouldn't be an O(n) task
const initialState = {
  list: [
    {
      id: 1,
      name: "Arts and Entertainment",
      shortName: "A&E",
      description: "Film, music, theater and more",
      parentId: null
    },
    {
      id: 2,
      name: "Photography",
      shortName: "photo",
      description: "Idk, photo shit",
      parentId: null
    },
    {
      id: 3,
      name: "News",
      shortName: "news",
      description: "New news is news",
      parentId: null
    },
    {
      id: 4,
      name: "Blog",
      shortName: "blog",
      description: "Blogs because everybody wants to hear my opinion",
      parentId: null
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