import Image from 'next/image';
import { BackgroundGradient } from '../ui/background-gradient';

interface FeatureSectionProps {
  title: string;
  description: string;
  src: string;
  side: 'left' | 'right';
}

export default function FeatureSection({
  title,
  description,
  src,
  side,
}: FeatureSectionProps) {
  return (
    <section className="w-full bg-background py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-6 lg:gap-12">
          <div className="flex justify-center lg:hidden">
            <BackgroundGradient className="w-full max-w-[400px] rounded-[22px] p-1">
              <Image
                src={src}
                width={800}
                height={800}
                alt="Feature illustration"
                className="h-auto w-full rounded-xl object-cover"
              />
            </BackgroundGradient>
          </div>

          <div
            className={`hidden items-center lg:grid lg:grid-cols-2 ${side === 'right' ? 'lg:grid-flow-col' : ''}`}
          >
            {side === 'left' && (
              <div className="flex justify-start">
                <BackgroundGradient className="w-full max-w-[400px] rounded-[22px] p-1">
                  <Image
                    src={src}
                    width={800}
                    height={800}
                    alt="Feature illustration"
                    className="h-auto w-full rounded-xl object-cover"
                  />
                </BackgroundGradient>
              </div>
            )}
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {title}
                </h2>
                <p className="max-w-[600px] text-base text-muted-foreground sm:text-lg md:text-xl">
                  {description}
                </p>
              </div>
            </div>
            {side === 'right' && (
              <div className="flex justify-end">
                <BackgroundGradient className="w-full max-w-[400px] rounded-[22px] p-1">
                  <Image
                    src={src}
                    width={800}
                    height={800}
                    alt="Feature illustration"
                    className="h-auto w-full rounded-xl object-cover"
                  />
                </BackgroundGradient>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center space-y-4 lg:hidden">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                {title}
              </h2>
              <p className="max-w-[600px] text-base text-muted-foreground sm:text-lg">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
