/** @type {import('next').NextConfig} */
const nextConfig = {
    crossOrigin: "use-credentials",
    eslint: {
        ignoreDuringBuilds: true, // ESLint hatalarını build sırasında yok sayar
    },
};

module.exports = nextConfig;
