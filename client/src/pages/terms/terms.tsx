import Footer from 'components/Footer';
import NavBar from 'components/navbar';
import FadeIn from 'react-fade-in';

export default function Terms() {
  return (
    <FadeIn>
      <NavBar />
      <div className="relative py-16 bg-white overflow-hidden">
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
          <div
            className="relative h-full text-lg max-w-prose mx-auto"
            aria-hidden="true"
          >
            <svg
              className="absolute top-12 left-full transform translate-x-32"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
              />
            </svg>
            <svg
              className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
              />
            </svg>
            <svg
              className="absolute bottom-12 left-full transform translate-x-32"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="d3eb07ae-5182-43e6-857d-35c643af9034"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
              />
            </svg>
          </div>
        </div>
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            <h1>
              <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
                TERMS
              </span>
              <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Terms of Service
              </span>
            </h1>
            <p className="mt-8 text-xl text-gray-500 leading-8">
              Our website requires you to meet these requirements before you
              sign up or login using our dashboard. By signing up or logging in, you agree to the following terms.
            </p>
          </div>
          <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
            <p>
              Please make sure that you follow these terms, else you may see
              your account deactivated.
            </p>
            <ul role="list">
              <li>
                You must be at least <strong>13 years old</strong> to use this
                service.
              </li>
              <li>
                Please follow the{' '}
                <a href="https://discord.com/terms">
                  Discord Terms of Service.
                </a>{' '}
                We are not affiliated with them, however, we do use them for our
                authentication.
              </li>
              <li>This service may not be used for any illegal things</li>
              <li>
                You are fully responsible for what you create or do with this
                service
              </li>
              <li>
                Follow our <strong>Blacklist Policy</strong>
              </li>
              <li>
                Using a VPN on this website is not allowed, and will be blocked
              </li>
            </ul>
            <p>
              If you have any additional questions, please contact us at{' '}
              <strong>support@serverside.fun</strong>
            </p>
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Blacklist Policy
            </span>
            <p>
              This service allows you to do many things to an extent. Please
              follow these terms else you <strong>will</strong> be blacklisted. If you purchase this, then you automatically agree to the following terms.
            </p>
            <ul role="list">
              <li>
                No abusing our script to an extent that makes players inside the
                game leave.
              </li>
              <li>
                You may not profit off of this service. This includes
                teleporting people to games, or prompt purchasing.
              </li>
              <li>No changing the map.</li>

              <li>No mass killing.</li>
              <li>
                No being annoying to the point you make the players leave the
                game.
              </li>
              <li>
                No running external executors, as it avoids your scripts being logged.
              </li>
              <li>No running commands on all players. </li>
              <li>No snitching or even hinting that the game is supported.</li>
              <li>
                No executing a script on non-whitelisted players (sharing
                whitelist)
              </li>
              <li>
                <strong>Use common sense, we log scripts.</strong>
              </li>
              <li>
                <strong>Staff can blacklist you for any reason they deem appropriate.</strong>
              </li>
            </ul>
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Contact Details
            </span>
            <p>
              For administrative reasons, legal, or any other serious reasons,
              please contact us at <strong>legal@serverside.fun</strong>{' '}
              via email. Any spam or non-serious requests will be ignored.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </FadeIn>
  );
}
