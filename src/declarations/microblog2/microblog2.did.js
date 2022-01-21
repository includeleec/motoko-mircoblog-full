export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const Message = IDL.Record({
    'text' : IDL.Text,
    'time' : Time,
    'author' : IDL.Text,
  });
  const MicroblogFull = IDL.Service({
    'follow' : IDL.Func([IDL.Principal], [], []),
    'follows' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    'get_name' : IDL.Func([], [IDL.Text], ['query']),
    'greet' : IDL.Func([IDL.Text], [IDL.Text], []),
    'installer' : IDL.Func([], [IDL.Principal], ['query']),
    'post' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'posts' : IDL.Func([Time], [IDL.Vec(Message)], ['query']),
    'set_name' : IDL.Func([IDL.Text], [], []),
    'timeline' : IDL.Func([Time], [IDL.Vec(Message)], []),
  });
  return MicroblogFull;
};
export const init = ({ IDL }) => { return []; };
