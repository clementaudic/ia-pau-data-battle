import { Loader } from '@components/ui/Loader';

export default function Loading() {
    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <Loader/>
        </div>
    );
}
