const request = {
    // request for movie
    popular: `/movie/popular?api_key=${
        import.meta.env.VITE_API_KEY
    }&sort_by=popularity.desc&language=en-US&page=1`,

    upcomingIDN: `/movie/upcoming?api_key=${
        import.meta.env.VITE_API_KEY
    }&sort_by=popularity.desc&language=en-US&page=1&region=ID`,

    tvPopular: `/tv/popular?api_key=${
        import.meta.env.VITE_API_KEY
    }&sort_by=popularity.desc&language=en-US&page=1`,

    tvTopRated: `/tv/top_rated?api_key=${
        import.meta.env.VITE_API_KEY
    }&language=en-US&page=1`,

    // request discover
    // movie
    horror: `/discover/movie?api_key=${
        import.meta.env.VITE_API_KEY
    }&sort_by=popularity.desc&with_genres=27,9648&page=1`,

    drama: `/discover/movie?api_key=${
        import.meta.env.VITE_API_KEY
    }&sort_by=popularity.desc&with_genres=18, 35, 10749&page=1`,

    action: `/discover/movie?api_key=${
        import.meta.env.VITE_API_KEY
    }&sort_by=popularity.desc&with_genres=12, 28&page=1`,

    mystery: `/discover/movie?api_key=${
        import.meta.env.VITE_API_KEY
    }&sort_by=popularity.desc&with_genres=53, 80, 9648&page=1`,

    // tv
    horrorTv: `/discover/tv?api_key=${
        import.meta.env.VITE_API_KEY
    }&sort_by=popularity.desc&with_genres=27,9648&page=1`,
    // test: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&sort_by=popularity.desc&page=1&with_genres=10751, 18&page=1`,
    // test: `/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&sort_by=popularity.desc&page=1&with_genres=27, 10751&with_watch_monetization_types=flatrate&with_status=0&with_type=0`,
};

export default request;
