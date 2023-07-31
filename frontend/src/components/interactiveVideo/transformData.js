import { v4 as uuidv4 } from 'uuid';

export const transformData = (title, interactiveVideos) => {
  if (!interactiveVideos) {
    return {
      // tree storing all the data related to current interactive video
      name: 'Root',
      id: uuidv4(),
      attributes: {
        url: '',
        LeadTimeField: 0, // this is the amount of time (in seconds) before the end of the video that the options should be displayed
      },
      children: [],
    };
  }

  // helper function to find a video by id
  const findVideoById = (id) =>
    interactiveVideos.find((video) => video.id === id);

  // recursive function to build a tree from a video
  const buildTree = (video) => {
    return {
      id: video.id,
      attributes: {
        url: video.url,
        LeadTimeField: video.LeadTimeField,
      },
      children: video.options.map((option) => ({
        name: option.label,
        ...buildTree(findVideoById(option.nextVideoId)),
      })),
    };
  };

  // find the root video and build the tree from it
  const rootVideo = interactiveVideos.find((video) => video.root);
  return { ...buildTree(rootVideo), name: title };
};
