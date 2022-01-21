import type { Principal } from '@dfinity/principal';
export interface Message { 'text' : string, 'time' : Time, 'author' : string }
export interface MicroblogFull {
  'follow' : (arg_0: Principal) => Promise<undefined>,
  'follows' : () => Promise<Array<Principal>>,
  'get_name' : () => Promise<string>,
  'greet' : (arg_0: string) => Promise<string>,
  'installer' : () => Promise<Principal>,
  'post' : (arg_0: string, arg_1: string) => Promise<undefined>,
  'posts' : (arg_0: Time) => Promise<Array<Message>>,
  'set_name' : (arg_0: string) => Promise<undefined>,
  'timeline' : (arg_0: Time) => Promise<Array<Message>>,
}
export type Time = bigint;
export interface _SERVICE extends MicroblogFull {}
