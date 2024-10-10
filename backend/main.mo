import Func "mo:base/Func";
import Int "mo:base/Int";
import Nat "mo:base/Nat";

import Array "mo:base/Array";
import Time "mo:base/Time";
import Text "mo:base/Text";

actor {
  // Define the Post type
  type Post = {
    id: Nat;
    title: Text;
    image: Text;
    body: Text;
    timestamp: Int;
  };

  // Initialize stable variable to store posts
  stable var posts : [Post] = [];
  stable var nextId : Nat = 0;

  // Function to add a new post
  public func addPost(title: Text, image: Text, body: Text) : async Nat {
    let post : Post = {
      id = nextId;
      title = title;
      image = image;
      body = body;
      timestamp = Time.now();
    };
    posts := Array.append([post], posts);
    nextId += 1;
    return post.id;
  };

  // Function to get all posts
  public query func getPosts() : async [Post] {
    return posts;
  };
}
