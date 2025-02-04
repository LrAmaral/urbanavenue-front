import { Wrapper } from "@/components/Custom/wrapper";
import Link from "next/link";

const About = () => {
  return (
    <div className="w-full h-80 flex flex-col items-center justify-center px-4 py-6">
      <Wrapper className="w-full max-w-4xl rounded-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-zinc-800">Contact</h2>
          <Link
            href={"mailto:contact@urbanavenuebr.com"}
            className="text-xl text-zinc-600 hover:underline hover:underline-offset-2"
          >
            contact@urbanavenuebr.com
          </Link>
        </div>
      </Wrapper>
    </div>
  );
};

export default About;
