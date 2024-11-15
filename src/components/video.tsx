"use client"
export default function Video() {
      return (
            <video height="150" width="100%" autoPlay muted loop playsInline>
            <source src="https://ik.imagekit.io/ikmedia/example_video.mp4" />
            Your browser does not support the video tag...
          </video>
      )
    }