# Mario Kart Tour Advisor

Little helper to advise you invest more on which card

Live: https://dipsywong98.github.io/MKTA

## Features

- [x] download all data

- [x] auto deploy pipeline

- [x] statistic of each cards: which has the most top courses

- [x] statistic of your cards:
    - [x] which of your card have the most unique top courses,\
that you dont have other card top in this course
    - [x] unlock which card will unlock the most courses (wish list)
    - [x] if unlock this card, you can unlock what courses
    - [x] store your cards in cookie

- [ ] minmax covering of cards: invest on minimum number of cards to excel the maximum of courses 
(seems this is just a maxflow problem on a bipartite graph(?))

## Development/Contribute

1. submit an issue for discussion

1. fork & clone

1. `yarn install` install all dependencies

1. `yarn sync` sync data and images with [mkt wiki](https://www.mariowiki.com/Mario_Kart_Tour)

1. `yarn start` start react dev server

1. merge request
