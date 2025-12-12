import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <main className="relative px-6 pt-12">
        {/* Gradient blob */}
        <div
          className="absolute right-0 top-0 h-[300px] w-[300px] animate-pulse rounded-full 
                     bg-linear-to-br from-pink-400 via-orange-300 to-yellow-200 
                     opacity-70 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative">
          <h1 className="max-w-3xl text-6xl font-light leading-tight tracking-tight">
            WE CREATE
            <br />
            BEST DIGITAL
            <br />
            PRODUCTS.
          </h1>

          <div className="mt-24 flex justify-between">
            <div className="max-w-md">
              <Button variant="outline" className="rounded-full border-2 px-8">
                <span className="relative">
                  DISCUSS THE PROJECT
                  <div
                    className="absolute -left-4 -right-4 -top-4 -bottom-4 animate-spin-slow 
                               rounded-full border border-black opacity-50"
                  ></div>
                </span>
              </Button>
              <p className="mt-8 text-sm leading-relaxed text-gray-600">
                WE ARE THE LEADERS IN WEB & MOBILE
                <br />
                DESIGN AND DEVELOPMENT INDUSTRY.
              </p>
            </div>

            <div className="flex items-end">
              <div className="flex items-center space-x-2">
                <span className="text-sm">WHO WE ARE</span>
                <span className="h-px w-12 bg-black"></span>
              </div>
            </div>
          </div>

          <p className="mt-24 max-w-xl text-sm leading-relaxed text-gray-600">
            We create quality content and cool ideas. We create websites,
            applications, 3D design, motion design and animation. We bring the
            most daring ideas to life
          </p>
        </div>
      </main>
    </div>
  );
}
