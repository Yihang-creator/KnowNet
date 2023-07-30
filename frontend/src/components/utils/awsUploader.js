export const awsUploader = async (media, accessToken) => {
  // Get the pre-signed URL from the backend
  const response = await fetch(
    '/api/aws/upload?fileType=' + encodeURIComponent(media.type),
    {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    },
  );
  const { url } = await response.json();

  //upload the media file to the s3 bucket
  const uploadResponse = await fetch(url, {
    method: 'PUT',
    body: media.file,
    headers: {
      'Content-Type': media.type,
    },
  });

  if (!uploadResponse.ok) {
    return null;
  } else {
    const s3Url = new URL(url.split('?')[0]);
    const cloudFrontDomain = 'https://d1sr6v3lnszfkp.cloudfront.net';
    const cloudFrontUrl = `${cloudFrontDomain}${s3Url.pathname}`;
    return cloudFrontUrl; //return the cloudfront url where you can access the media you sent
  }
};
