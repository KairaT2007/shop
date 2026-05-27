'use client';

import { useState, useEffect, useCallback } from 'react';

export function useGreetingSlider() {
    const [mainApi, setMainApi] = useState(null);
    const [thumbApi, setThumbApi] = useState(null);
    const [commentsApi, setCommentsApi] = useState(null);
    const [current, setCurrent] = useState(0);

    const syncCarousels = useCallback((selectedIndex) => {
        setCurrent(selectedIndex);

        if (mainApi && mainApi.selectedScrollSnap() !== selectedIndex) {
            mainApi.scrollTo(selectedIndex);
        }
        if (thumbApi && thumbApi.selectedScrollSnap() !== selectedIndex) {
            thumbApi.scrollTo(selectedIndex);
        }
        if (commentsApi && commentsApi.selectedScrollSnap() !== selectedIndex) {
            commentsApi.scrollTo(selectedIndex);
        }
    }, [mainApi, thumbApi, commentsApi]);

    useEffect(() => {
        if (!mainApi) return;

        setCurrent(mainApi.selectedScrollSnap());

        const onSelect = () => syncCarousels(mainApi.selectedScrollSnap());
        mainApi.on('select', onSelect);

        return () => mainApi.off('select', onSelect);
    }, [mainApi, syncCarousels]);

    useEffect(() => {
        if (!thumbApi) return;

        const onSelect = () => syncCarousels(thumbApi.selectedScrollSnap());
        thumbApi.on('select', onSelect);

        return () => thumbApi.off('select', onSelect);
    }, [thumbApi, syncCarousels]);

    useEffect(() => {
        if (!commentsApi) return;

        const onSelect = () => syncCarousels(commentsApi.selectedScrollSnap());
        commentsApi.on('select', onSelect);

        return () => commentsApi.off('select', onSelect);
    }, [commentsApi, syncCarousels]);

    const handleThumbClick = useCallback((index) => {
        mainApi?.scrollTo(index);
    }, [mainApi]);

    const menudata = [
        {
            id: 1,
            img: '/signin.jpg',
            imgAlt: 'plate-1',
            userComment: 'The ambiance is perfect and the food is absolutely delicious. Highly recommended!',
            userAvatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-56.png'
        },
        {
            id: 2,
            img: '/signup.jpg',
            imgAlt: 'plate-2',
            userComment: 'Best dining experience in town. The staff is friendly and the menu is exceptional.',
            userAvatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-46.png'
        },
        {
            id: 3,
            img: '/signin.jpg',
            imgAlt: 'plate-3',
            userComment: 'Every dish is crafted with care. This place never disappoints!',
            userAvatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-57.png'
        },
        {
            id: 4,
            img: '/signup.jpg',
            imgAlt: 'plate-4',
            userComment: 'Great atmosphere and incredible flavors. A must-visit restaurant!',
            userAvatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-58.png'
        },
        {
            id: 5,
            img: '/signin.jpg',
            imgAlt: 'plate-3',
            userComment: 'Every dish is crafted with care. This place never disappoints!',
            userAvatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-57.png'
        }
    ]

    return {
        setMainApi,
        setThumbApi,
        setCommentsApi,
        current,
        handleThumbClick,
        menudata,
    };
}