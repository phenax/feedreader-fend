/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('should be defined', function() {

            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('should have a valid url', function() {

            // // To make it fail
            // allFeeds.push({
            //     name: 'dummy',
            //     url: ''
            // })

            var filteredFeeds= allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });


            // Alternatively
            var filteredFeeds= allFeeds.filter(function(feed) {
                return feed.url && feed.url.length > 0;
            });

            expect(filteredFeeds.length).toBe(allFeeds.length);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('should have a valid name', function() {

            // // To make it fail
            // allFeeds.push({
            //     name: '',
            //     url: 'dummy'
            // })

            var filteredFeeds= allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {

        var $body= $('body');
        var $menuBtn= $('.menu-icon-link');

        var getMenuVisibility= $body.hasClass.bind($body, 'menu-hidden');

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('should be hidden by default', function() {
            expect(getMenuVisibility()).toBe(true);
        });


         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('should toggle visibility when menu button is clicked', function() {

            // Simulate a click
            // $menuBtn.trigger('click');
            onMenuButtonClick();

            // Menu should be visible
            expect(getMenuVisibility()).toBe(false);

            // Click again
            // $menuBtn.trigger('click');
            onMenuButtonClick();

            // Menu should be hidden
            expect(getMenuVisibility()).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('should have atleast one entry on load', function(done) {

            var $feed= $('.feed');

            // Should exists
            expect($feed.length).toBeGreaterThan(0);

            // Should have more than 0 children
            expect($feed.find('.entry').length).toBeGreaterThan(0);

            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        var $feed= $('.feed');

        var firstLoadContent;

        beforeEach(function(done) {

            // First load the second feed. 
            loadFeed(1, function() {
                firstLoadContent= $feed.html();
                done();
            });
        });

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('should change content when loaded', function(done) {

            // Then load the first feed
            loadFeed(0, function() {

                // Expect content to change
                expect($feed.html()).not.toBe(firstLoadContent);

                done();
            });
        });
    });



    /* TODO: Write a test suite to check exception handling for loadFeed(4); */
}());
