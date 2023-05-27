module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/a/AGNmyxao8VQKbmGIplSQQW9VUJX9DnF6gHXaFLxN9ULu=s96-c',
      },
    ],
  },
  // I don't want it to run when compiling as I trust the CI stage of the pipeline and Husky.
  ignoreDuringBuilds: true,
};
