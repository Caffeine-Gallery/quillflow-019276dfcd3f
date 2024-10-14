export const idlFactory = ({ IDL }) => {
  const Post = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'body' : IDL.Text,
    'timestamp' : IDL.Int,
    'image' : IDL.Text,
  });
  return IDL.Service({
    'addPost' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [IDL.Nat], []),
    'getPosts' : IDL.Func([], [IDL.Vec(Post)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
