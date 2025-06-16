import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
// import { ArrowLeft, ArrowRight } from "lucide-react"
// import ArrLeft from "@/assets/leftArrow.svg"
// import RightArr from "@/assets/rightArrow.svg"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  currentSlide: number // Add this
  totalSlides: number  // Add this
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)
const [currentSlide, setCurrentSlide] = React.useState(0) // Add this
  const [totalSlides, setTotalSlides] = React.useState(0)   // Add this

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
    setCurrentSlide(api.selectedScrollSnap()) // Add this
    setTotalSlides(api.scrollSnapList().length) // Add this
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext]
  )

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on("reInit", onSelect)
    api.on("select", onSelect)

    return () => {
      api?.off("select", onSelect)
    }
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        currentSlide: currentSlide + 1,
        totalSlides,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden rounded-[24px] py-2"
      data-slot="carousel-content"
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel()

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "px-[10px]" : "pt-4",
        className
      )}
      {...props}
    />
  )
}

function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        "absolute scale-120 dark:border-yellow-600 w-[32px] h-[32px] 2xl:w-[40px] 2xl:h-[40px] bg-transparent hover:bg-transparent border-black border-[2px] rounded-full ",
        orientation === "horizontal"
          ? "-bottom-1/7 md:-bottom-1/5 left-1/2 -translate-x-[calc(100%+40px)] -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
     {/* <img src={ArrLeft} alt="" /> */}
     <svg className="fill-black dark:fill-yellow-600" width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M0.457332 9.94802L8 17.4907L9.88533 15.6054L3.28533 9.00535L9.88533 2.40535L8 0.52002L0.457332 8.06269C0.207371 8.31272 0.0669498 8.6518 0.0669498 9.00535C0.0669498 9.35891 0.207371 9.69798 0.457332 9.94802Z"/>
</svg>

      <span className="sr-only">Previous slide</span>
    </Button>
  )
}

function CarouselPrevious2({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        "absolute scale-120 dark:border-secondary-foreground w-[40px] h-[40px] bg-transparent hover:bg-transparent border-black border-[2px] rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -left-12 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
     {/* <img src={ArrLeft} alt="" /> */}
        <svg className="fill-black dark:fill-secondary-foreground" width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M0.457332 9.94802L8 17.4907L9.88533 15.6054L3.28533 9.00535L9.88533 2.40535L8 0.52002L0.457332 8.06269C0.207371 8.31272 0.0669498 8.6518 0.0669498 9.00535C0.0669498 9.35891 0.207371 9.69798 0.457332 9.94802Z"/>
</svg>

      <span className="sr-only">Previous slide</span>
    </Button>
  )
}

function CarouselNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        "absolute scale-120 w-[32px] dark:border-yellow-600 h-[32px] 2xl:w-[40px] 2xl:h-[40px] bg-transparent hover:bg-transparent border-black rounded-full border-[2px]",
        orientation === "horizontal"
          ? "-bottom-1/7 md:-bottom-1/5 left-1/2 translate-x-[40px] -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
       {/* <img src={RightArr} alt="" /> */}
       <svg className="fill-black dark:fill-yellow-600" width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M9.54267 9.94802L2 17.4907L0.11467 15.6054L6.71467 9.00535L0.11467 2.40535L2 0.52002L9.54267 8.06269C9.79263 8.31272 9.93305 8.6518 9.93305 9.00535C9.93305 9.35891 9.79263 9.69798 9.54267 9.94802Z"/>
</svg>

      <span className="sr-only">Next slide</span>
    </Button>
  )
}

function CarouselNext2({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        "absolute scale-120 dark:border-secondary-foreground  w-[40px] h-[40px] bg-transparent hover:bg-transparent border-black rounded-full border-[2px]",
        orientation === "horizontal"
          ? "top-1/2 -right-12 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
       {/* <img  src={RightArr} alt="" /> */}
            <svg className="fill-black dark:fill-secondary-foreground" width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M9.54267 9.94802L2 17.4907L0.11467 15.6054L6.71467 9.00535L0.11467 2.40535L2 0.52002L9.54267 8.06269C9.79263 8.31272 9.93305 8.6518 9.93305 9.00535C9.93305 9.35891 9.79263 9.69798 9.54267 9.94802Z"/>
</svg>
      <span className="sr-only">Next slide</span>
    </Button>
  )
}



function CarouselIndicator({ 
  className, 
  ...props 
}: React.ComponentProps<"div">) {
  const { currentSlide, totalSlides } = useCarousel()

  return (
    <div
      className={cn(
        "absolute scale-120 -bottom-1/7 md:-bottom-1/5 left-1/2 -translate-x-1/2 -translate-y-5/6 2xl:-translate-y-2/5 2xl:py-1.5 text-lg 2xl:text-xl noto-sans-semibold",
        className
      )}
      {...props}
    >
      {currentSlide}/{totalSlides}
    </div>
  )
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselIndicator,
  CarouselPrevious2,
  CarouselNext2
}
