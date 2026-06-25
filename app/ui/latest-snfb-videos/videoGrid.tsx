import { VideoGridProps } from '@/app/lib/snfb-video/interfaces';
import DraggableScroll from '../draggableScroll';

export default function VideoGrid({ videos }: VideoGridProps) {
    return (
        <DraggableScroll className="
        grid grid-flow-col auto-cols-[340px]
        gap-4 overflow-x-auto scroll-smooth
        snap-x snap-mandatory pb-2
        scrollbar-width:none [&::-webkit-scrollbar]:hidden
        ">
            {videos.map((video) => (
                <div 
                    key={video.id} 
                    className='flex flex-col group snap-start w-70'>
                    <div className='aspect-video relative rounded-lg overflow-hidden bg-chiefs-2/50 dark:bg-chiefs-2/5'>
                        <iframe 
                            src={`https://www.youtube.com/embed/${video.id}`}
                            title={video.title}
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                            allowFullScreen
                            className='w-full h-full
                            group-hover:scale-105
                            transition-all duration-300'
                        />
                    </div>
                </div>
           ))} 
        </DraggableScroll>
    );
}