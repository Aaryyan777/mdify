"use client";
import Beams from "@/components/Beams";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ClickSpark from "@/components/ClickSpark";
import TextType from "@/components/TextType";


export default function Page() {
  const [url, setUrl] = useState("");
  const router = useRouter();

  function navigateToEditor() {
    if (url.trim() !== "") {
      router.push(`/editor?url=${encodeURIComponent(url)}`);
    }
  }

  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-black">
      {/* GradientBlinds Background */}
      <div className="absolute inset-0 w-full h-full">
        <Beams
    beamWidth={2}
    beamHeight={15}
    beamNumber={12}
    lightColor="#ffffff"
    speed={2}
    noiseIntensity={1.75}
    scale={0.2}
    rotation={30}
  />
      </div>
      
      {/* Content */}
      <ClickSpark
        sparkColor='#fff'
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="flex flex-col items-center justify-center max-w-4xl w-full text-center space-y-8 font-bricolage">
            {/* Heading */}
            <TextType 
              text={["Convert Medium to Markdown", "Clean, editable content", "Ready in seconds!"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              className="text-6xl max-sm:text-4xl font-medium tracking-tight text-white"
            />
            
            {/* Description */}
            <p className="text-lg max-sm:text-base text-gray-300 max-w-2xl">
              Paste any Medium link below and instantly get a Markdown version  formatted, editable, and ready for your site or notes.
            </p>
            
            {/* Input Section */}
            <div className="w-full max-w-3xl flex flex-col sm:flex-row gap-2">
              <input
                type="url"
                value={url}
                onChange={(e)=>setUrl(e.target.value)}
                placeholder="Enter Medium blog URL"

                className="flex-1 h-12 px-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />

              <Button onClick={navigateToEditor} className="h-12 px-6 rounded-lg bg-blend-color text-white font-medium  transition-colors">
                Convert
              </Button>
            </div>
          </div>
        </div>
      </ClickSpark>
    </div>
  )
}
