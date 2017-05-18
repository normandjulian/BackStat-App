import { Team } from '../classes/team.class';
import { TeamFull } from '../classes/team.class';

export const TEAMS: Team[] = [
    {
        '_id': '5856b7bd80affe631645e390',
        'name': 'Seniors 1',
        'coach': 'Thomas',
        'period': {
          'type': 4,
          'time': 10
        }
    },
    {
        '_id': '5856b8f2bd6c1763b20faef5',
        'name': 'Seniors 2',
        'coach': 'Nicolas',
        'period': {
          'type': 4,
          'time': 10
        }
    }
];

export const TEAMSFULL: TeamFull[] = [
    {
        '_id': '5856b7bd80affe631645e390',
        'name': 'Seniors 1',
        'coach': 'Thomas',
        'period': {
          'type': 4,
          'time': 10
        },
        'players': [
          {
            '_id': '11',
            'firstname': 'Gaetan',
            'lastname': 'Oury',
            'number': 4
          },
          {
            '_id': '22',
            'firstname': 'Ruben',
            'lastname': 'Theresine Lafont',
            'number': 5
          },
          {
            '_id': '33',
            'firstname': 'Vince',
            'lastname': 'Kobe',
            'number': 6
          },
          {
            '_id': '44',
            'firstname': 'Clement',
            'lastname': 'Jeanneau',
            'number': 7
          },
          {
            '_id': '55',
            'firstname': 'Doug',
            'lastname': 'Poignet cassé',
            'number': 8
          },
          {
            '_id': '66',
            'firstname': 'Nicolas',
            'lastname': 'Lovinet',
            'number': 9
          },
          {
            '_id': '66',
            'firstname': 'Mathieu',
            'lastname': 'Guillautel',
            'number': 10
          },
          {
            '_id': '77',
            'firstname': 'Manu',
            'lastname': 'El Blacko',
            'number': 11
          },
          {
            '_id': '88',
            'firstname': 'Etienne',
            'lastname': 'Daho',
            'number': 12
          },
          {
            '_id': '99',
            'firstname': 'Alex',
            'lastname': 'Pouplin',
            'number': 13
          },
          {
            '_id': '991',
            'firstname': 'Johnantan',
            'lastname': 'Simmons',
            'number': 14
          },
          {
            '_id': '992',
            'firstname': 'Alfred',
            'lastname': 'CoOil',
            'number': 15
          }
        ]
    },
    {
        '_id': '5856b8f2bd6c1763b20faef5',
        'name': 'Seniors 2',
        'coach': 'Nicolas',
        'period': {
          'type': 4,
          'time': 10
        },
        'players': []
    }
];
