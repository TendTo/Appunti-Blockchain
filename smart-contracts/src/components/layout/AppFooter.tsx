export function AppFooter() {
  return (
    <footer className="bg-gray-800 w-full py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <ul className="max-w-screen-md mx-auto text-lg font-light flex flex-wrap justify-between">
          <li className="my-2">
            <a
              className="text-gray-300 hover:text-white transition-colors duration-200"
              href="#"
            >
              FAQ
            </a>
          </li>
          <li className="my-2">
            <a
              className="text-gray-300 hover:text-white transition-colors duration-200"
              href="#"
            >
              About us
            </a>
          </li>
          <li className="my-2">
            <a
              className="text-gray-300 hover:text-white transition-colors duration-200"
              href="https://github.com/TendTo/Appunti-Blockchain"
            >
              Github
            </a>
          </li>
        </ul>
        <div className="text-center text-gray-200 pt-10 sm:pt-12 font-light flex items-center justify-center">
          Created by{" "}
          <a
            className="mx-1"
            href="https://github.com/TendTo"
            target={"_blank"}
            rel={"noreferrer"}
          >
            {" "}
            tend
          </a>{" "}
          and{" "}
          <a
            className="mx-1"
            href="https://github.com/makapx"
            target={"_blank"}
            rel={"noreferrer"}
          >
            makapx
          </a>
        </div>
      </div>
    </footer>
  );
}
