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


    describe('RSS Feeds', function() {

        it('should be defined', function() {

            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


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


    /* TODO: Write a new test suite named 'The menu' */
    describe('The menu', function() {

        var $body= $('body');
        var $menuBtn= $('.menu-icon-link');

        var getMenuVisibility= $body.hasClass.bind($body, 'menu-hidden');


        it('should be hidden by default', function() {
            expect(getMenuVisibility()).toBeTruthy();
        });

        it('should toggle visibility when menu button is clicked', function() {

            // Simulate a click
            // $menuBtn.trigger('click');
            onMenuButtonClick();

            // Menu should be visible
            expect(getMenuVisibility()).toBeFalsy()

            // Click again
            // $menuBtn.trigger('click');
            onMenuButtonClick();

            // Menu should be hidden
            expect(getMenuVisibility()).toBeTruthy();
        });
    });


    describe('Feed Loading', function() {

        describe('Initial Entries', function() {

            beforeEach(function(done) {
                loadFeed(0, done);
            });

            it('should have atleast one entry on load', function(done) {

                var $feed= $('.feed');

                // Should exists
                expect($feed.length).toBeGreaterThan(0);

                // Should have more than 0 children
                expect($feed.find('.entry').length).toBeGreaterThan(0);

                done();
            });
        });


        describe('New Feed Selection', function() {

            var firstLoadContent;
            var $feed= $('.feed');

            beforeEach(function(done) {

                // First load the second feed. 
                loadFeed(1, function() {

                    firstLoadContent= $feed.html();

                    loadFeed(0, done);
                });
            });

            it('should change content when loaded', function(done) {

                // Expect content to change
                expect($feed.html()).not.toBe(firstLoadContent);

                done();
            });
        });


        describe('Feed Exceptions', function() {

            it('should throw an exception when the index exceeds the length of the feed', function(done) {

                var outOfBoundIndex= allFeeds.length + 1;

                expect(loadFeed.bind(window, outOfBoundIndex, done))
                    .toThrow(new Error('Invalid feed ID'));

                done();
            });
        });
    });
}());
