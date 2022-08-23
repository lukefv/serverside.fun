import Footer from '../components/Footer';
import NavBar from '../components/navbar';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import FadeIn from 'react-fade-in';

const faqs = [
  {
    question: 'What is this?',
    answer:
      'This is a serversided ROBLOX user-interface allowing you to do anything you want in our supported games. We are one of the largest serversided user-interfaces in the market, with the best selection of supported games.',
  },
  {
    question: 'Is there a download?',
    answer:
      'Nope! There is no download required to use serverside.fun. Our software is fully internal, and automatically appears in your game when you join.',
  },
  {
    question: 'How does this work?',
    answer:
      'We partner with game developers & game owners to give you the UI in their games. This is not a cheat/exploit like others may think, as it is very similar to having admin in game. Once you join a game, you are instantly given our UI, and you can do anything you may please with our unlimited execution, and a huge script hub. Our YouTube partners advertise them as exploits, however, they are only mentioning that to get a larger audience.',
  },
  {
    question: 'How do I purchase this?',
    answer:
      'Please visit our dashboard and go on the purchase section to purchase this.',
  },
  {
    question: 'Is this illegal?',
    answer:
      'Nope! Like mentioned earlier, we partner with game developers to give you access to this product. You are fully allowed to do whatever you want in our supported games as long as it follows our Terms Of Service without getting in any trouble.',
  },
  {
    question: 'What can I do with this?',
    answer:
      'If you are whitelisted, you can access our supported games, and do anything you please as long as it follows our Terms Of Service. Our product is serversided, which means that you can fully bypass filtering enabled compared to other competitors. ',
  },
  {
    question: 'Is this against ROBLOX TOS?',
    answer:
      'Nope! You will not get banned from any platforms for using this product, and you can use it in any game we support, as long as it follows our Terms Of Service. This is because it is a user interface built into ROBLOX itself, and there are absolutely no injectors or cheats involved when you are using this. Our product fully follows the ROBLOX TOS, and is not against it whatsoever.',
  },
  // More questions...
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function FAQ() {
  return (
    <>
      <FadeIn>
        <NavBar />

        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
            <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Frequently asked questions
            </h2>
            <dl className="mt-6 space-y-6 divide-y divide-gray-200">
              {faqs.map((faq) => (
                <Disclosure as="div" key={faq.question} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt className="text-lg">
                        <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                          <span className="font-medium text-gray-900">
                            {faq.question}
                          </span>
                          <span className="ml-6 h-7 flex items-center">
                            <ChevronDownIcon
                              className={classNames(
                                open ? '-rotate-180' : 'rotate-0',
                                'h-6 w-6 transform',
                              )}
                              aria-hidden="true"
                            />
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="mt-2 pr-12">
                        <p className="text-base text-gray-500">{faq.answer}</p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>

        <Footer />
      </FadeIn>
    </>
  );
}
