import Link from "next/link";
import { useState } from "react";
import classnames from "classnames";

export default function Header() {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className="mx-auto max-w-7xl pb-8 md:px-10 md:pb-24 flex justify-between items-center">
      <h2 className="text-3xl font-semibold md:text-5xl">
        <span
          className="bg-contain bg-center bg-no-repeat px-4 text-white"
          style={{ background: "url('/brand.svg')" }}
        >
          Video
        </span>
      </h2>
      <nav className="flex-1 w-full text-right text-black">
        <Link
          href="/"
          target="_self"
          className={classnames([
            "md:mr-10",
            "mr-4",
            { "text-orange-500 font-bold": currentTab === 0 },
          ])}
          onClick={() => setCurrentTab(0)}
        >
          အသုံးပြုနည်း
        </Link>
        <Link
          href="/introduction"
          target="_self"
          className={classnames({
            "text-orange-500 font-bold": currentTab === 1,
          })}
          onClick={() => setCurrentTab(1)}
        >
          Introduction
        </Link>
      </nav>
    </div>
  );
}
