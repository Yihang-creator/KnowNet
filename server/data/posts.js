let posts = [
  {
    "postId": "1",
    "userId": "1",
    "mediaType": "image",
    "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
    "title": "We have Big Buck Bunny!",
    "text": "Check out this delightful image of Big Buck Bunny, everyone's favorite character from the renowned animated short film. " +
        "This affable rabbit, with his endearing charm and charisma, never fails to put a smile on our faces. Despite his size, his gentle and kind-hearted nature makes him a true hero. " +
        "Let's take a moment to appreciate this adorable creature and the joy he brings into our lives!.",
    "like": ["1", "2"],
    "comments": ["1", "2"],
    "tags": [],
    "timestamp": "2023-06-08T00:05:00Z"
  },
  {
    "postId": "2",
    "userId": "1",
    "mediaType": "image",
    "mediaUrl": "https://images.unsplash.com/photo-1611003229235-fb5748510459?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    "title": "Leave some course seats for me plz🥹🥹🥹",
    "text": "My reg time is at the beginning of July, and I saw the courses I want to get in being full every second. Im dead inside.",
    "like": ["1"],
    "comments": ["3"],
    "tags": [],
    "timestamp": "2023-06-08T00:05:00Z"
  },
  {
    "postId": "3",
    "userId": "2",
    "mediaType": "image",
    "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
    "title": "I met a bad guy on campus last week!",
    "text": "This is the content of post 3.",
    "like": ["1"],
    "comments": [],
    "tags": [],
    "timestamp": "2023-06-08T00:05:00Z"
  },
  {
    "postId": "4",
    "userId": "2",
    "mediaType": "video",
    "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "title": "Post Title 4",
    "text": "A nice and cool video.",
    "like": [],
    "comments": [],
    "tags": [],
    "timestamp": "2023-06-08T00:05:00Z"
  },
  {
    "postId": "5",
    "userId": "1",
    "mediaType": "image",
    "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
    "title": "Khaleesi … there sits Balerion, come again",
    "text": "This is the content of post 5.",
    "like": [],
    "comments": [],
    "tags": [],
    "timestamp": "2023-06-08T00:05:00Z"
  },
  {
    "postId": "6",
    "userId": "1",
    "mediaType": "video",
    "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "title": "She is the mother of dragons!",
    "text": "This is the content of post 6.",
    "like": [],
    "comments": [],
    "tags": [],
    "timestamp": "2023-06-08T00:05:00Z"
  },
  {
    "postId": "7",
    "userId": "1",
    "mediaType": "image",
    "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
    "title": "Post Title 7",
    "text": "This is the content of post 7.",
    "like": ["2"],
    "comments": [],
    "tags": [],
    "timestamp": "2023-06-08T00:05:00Z"
  },
  {
    "postId": "8",
    "userId": "1",
    "mediaType": "video",
    "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    "title": "Post Title 8",
    "text": "This is the content of post 8.",
    "like": [],
    "comments": [],
    "tags": [],
    "timestamp": "2023-06-08T00:05:00Z"
  },
  {
    "postId": "9",
    "userId": "1",
    "mediaType": "image",
    "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg",
    "title": "Post Title 9",
    "text": "This is the content of post 9.",
    "like": ["1"],
    "comments": [],
    "tags": [],
    "timestamp": "2023-06-08T00:05:00Z"
  },
  {
    "postId": "10",
    "userId": "1",
    "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    "title": "Post Title 10",
    "text": "This is the content of post 10.",
    "like": [],
    "comments": [],
    "tags": [],
    "timestamp": "2023-06-08T00:05:00Z"
  },
  {
    "postId": "11",
    "userId": "1",
    "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg",
    "title": "Post Title 11",
    "text": "This is the content of post 11.",
    "like": ["1"],
    "comments": [],
    "tags": [],
    "timestamp": "2023-06-08T00:05:00Z"
  },
  {
    "postId": "12",
    "userId": "1",
    "mediaType": "video",
    "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    "title": "Post Title 12",
    "text": "This is the content of post 12.",
    "like": [],
    "comments": [],
    "tags": [],
    "timestamp": "2023-06-08T00:05:00Z"
  },
  {
    "postId": "13",
    "userId": "1",
    "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg",
    "title": "Post Title 13",
    "text": "This is the content of post 13.",
    "like": [],
    "comments": [],
    "tags": [],
    "timestamp": "2023-06-08T00:05:00Z"
  },
  {
    "postId": "14",
    "userId": "1",
    "mediaType": "video",
    "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    "title": "Post Title 14",
    "text": "This is the content of post 14.",
    "like": [],
    "comments": [],
    "tags": [],
    "timestamp": "2023-06-08T00:05:00Z"
  },
  {
    "postId": "15",
    "userId": "2",
    "mediaType": "image",
    "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
    "title": "Post Title 15",
    "text": "This is the content of post 15.",
    "like": ["1","2"],
    "comments": [],
    "tags": [],
    "timestamp": "2023-06-08T00:05:00Z"
  },
  {
    "postId": "16",
    "userId": "2",
    "mediaType": "image",
    "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.jpg",
    "title": "Post Title 16",
    "text": "This is the content of post 16.",
    "like": [],
    "comments": [],
    "tags": [],
    "timestamp": "2023-06-08T00:05:00Z"
  },
  {
    "postId": "17",
    "userId": "2",
    "mediaType": "image",
    "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg",
    "title": "Post Title 17",
    "text": "This is the content of post 17.",
    "like": [],
    "comments": [],
    "tags": [],
    "timestamp": "2023-06-08T00:05:00Z"
  },
  {
    "postId": "18",
    "userId": "2",
    "mediaType": "video",
    "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    "title": "Post Title 18",
    "text": "This is the content of post 18.",
    "like": [],
    "comments": [],
    "tags": [],
    "timestamp": "2023-06-08T00:05:00Z"
  },
  {
    "postId": "19",
    "userId": "2",
    "mediaType": "image",
    "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
    "title": "Post Title 19",
    "text": "This is the content of post 19.",
    "like": [],
    "comments": [],
    "tags": [],
    "timestamp": "2023-06-08T00:05:00Z"
  },
  {
    "postId": "20",
    "userId": "2",
    "mediaType": "video",
    "mediaUrl": "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "title": "Post Title 20",
    "text": "This is the content of post 20.",
    "like": [],
    "comments": [],
    "tags": [],
    "timestamp": "2023-06-08T00:05:00Z"
  }
]

module.exports.posts = posts;