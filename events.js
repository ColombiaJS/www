'use strict';

var qs      = require('querystring'),
    path    = require('path'),
    util    = require('util'),
    async   = require('async'),
    request = require('request'),
    moment  = require('moment'),
    config  = require('./config.json');

var groups = [ 'BogotaJS', 'MedellinJS', 'CaliJS' ];
moment.locale("es");

module.exports = function (callback) {

  async.map(groups, fetchEvents, callback);

  function fetchEvents(group, next) {
    var url = 'https://api.meetup.com/2/events?';
    var params = {
      sign: true,
      group_urlname: group,
      status: 'upcoming,past',
      page: 2,
      desc: true,
      key: config.meetup.apiKey
    };

    url += qs.stringify(params);
    request(url, function onRequest(err, res, body) {
      if (err) return callback(err);
      var meetupEvents = JSON.parse(body).results;
      var cols = 12 / meetupEvents.length;
      var events = meetupEvents.map(function (e) {
         var event = {
          id: e.id,
          cols: cols - 1,
          title: e.name,
          description: e.description,
          link: e.event_url,
          attending: e.yes_rsvp_count,
          date: moment(e.time).format("LLLL"),
          venue: {
            name: e.venue.name,
            address: e.venue.address_1
          },
          status: e.status
        };

        return event;
      });

      next(null, { group: group, events: events });
    });
  }
};
