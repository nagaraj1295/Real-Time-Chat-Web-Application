import React from "react";

const SidebarSkeleton = () => {
    // 8 skeleton items
    const skeletonContacts = Array(8).fill(null);

    return (
        <aside
            className="h-full w-20 lg:w-72 border-r border-base-300 
    flex flex-col transition-all duration-200 bg-slate-900/50 backdrop-blur-md"
        >
            {/* Header */}
            <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2">
                    <div className="skeleton size-6 rounded bg-white/10" />
                    <div className="skeleton h-5 w-24 bg-white/10 hidden lg:block" />
                </div>
            </div>

            {/* Skeleton Contacts */}
            <div className="overflow-y-auto w-full py-3">
                {skeletonContacts.map((_, idx) => (
                    <div key={idx} className="w-full p-3 flex items-center gap-3">
                        {/* Avatar skeleton */}
                        <div className="relative mx-auto lg:mx-0">
                            <div className="skeleton size-12 rounded-full bg-white/10" />
                        </div>

                        {/* User info skeleton - only visible on larger screens */}
                        <div className="hidden lg:block text-left min-w-0 flex-1">
                            <div className="skeleton h-4 w-32 mb-2 bg-white/10" />
                            <div className="skeleton h-3 w-16 bg-white/10" />
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default SidebarSkeleton;
