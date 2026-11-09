/* Shared source for 2D and 3D. Listing dimensions where given; other sizes approximate (flagged). */
(function(root){const data={
 "version": "2026-11-09-house-v4.1",
 "status": "Listing room dimensions + still-verified door relationships; unlisted sizes approximate",
 "units": "feet",
 "north": "-Z in 3D; up in plans. Lakes are north (owner).",
 "warning": "Not measured or as-built. Listing dimensions shown with ″; every other size is approximate and flagged.",
 "notes": [
  "Lakes are north (owner). The primary bedroom is east of the living room (owner).",
  "Living north glass is windows only — no door. Reach the north deck from outside via the patio side.",
  "Fireplace is on the living room’s west wall; open stair rises south along its east side.",
  "Hall south end (owner, Nov 9): walking south from the primary suite, the half bath is the last door on the right (west), just before a T at the garage door; at the T, left (east) is the door to the small side deck and right (west) is the door toward the front of the house. This T is the area earlier called a mudroom — no separate mudroom room.",
  "Garage opens directly to the main hall. No extra service room between.",
  "Upstairs: bath straight ahead of the stair arrival; east and west rooms are at the ends; middle room shares the bath’s south wall; rail on the north side.",
  "Lower level: wooden door from lower living to bedroom 1; bath has two doors (bedroom 1 and hall); hall opens wide to living; two exterior exits.",
  "Orange dashed outlines or doors mark items whose size, position or identity is not verified.",
  "Upper bedroom listing numbers (Bedroom 2/3/4) are not confirmed for east/middle/west."
 ],
 "levels": [
  {
   "id": "main",
   "name": "Main floor",
   "elevation": 10,
   "rooms": [
    {
     "id": "living",
     "label": "Vaulted living",
     "x": 0,
     "z": 0,
     "w": 22.9167,
     "d": 17,
     "kind": "room",
     "dim": "22′11″ × 17′",
     "use": "Steinway B + cigar lounge",
     "note": "North wall: windows only, no door. Fireplace on west wall."
    },
    {
     "id": "stair",
     "label": "Open stair · rises S",
     "x": 19.9167,
     "z": 3,
     "w": 3,
     "d": 11,
     "kind": "stairs",
     "uncertain": "Stair width/run unmeasured; down-flight to lower level assumed stacked beneath"
    },
    {
     "id": "kitchen",
     "label": "Kitchen + island",
     "x": 8.6667,
     "z": 17,
     "w": 14.25,
     "d": 12.9167,
     "kind": "room",
     "dim": "14′3″ × 12′11″"
    },
    {
     "id": "dining",
     "label": "Dining / sunroom",
     "x": 0,
     "z": 17,
     "w": 8.6667,
     "d": 13.4167,
     "kind": "room",
     "dim": "13′5″ × 8′8″",
     "uncertain": "Listing pair drawn with long side N–S; axis unverified"
    },
    {
     "id": "hall",
     "label": "Main hall",
     "x": 22.9167,
     "z": 0,
     "w": 3.5,
     "d": 41,
     "kind": "hall",
     "uncertain": "Hall width and length not listed"
    },
    {
     "id": "primary",
     "label": "Primary bedroom",
     "x": 26.4167,
     "z": 0,
     "w": 17.4167,
     "d": 13.8333,
     "kind": "room",
     "dim": "17′5″ × 13′10″",
     "use": "Clark + Jenny suite"
    },
    {
     "id": "primarybath",
     "label": "Primary bath",
     "x": 33,
     "z": 13.8333,
     "w": 10.8333,
     "d": 8.1667,
     "kind": "bath",
     "uncertain": "Size and door position not listed"
    },
    {
     "id": "pantry",
     "label": "Pantry",
     "x": 26.4167,
     "z": 13.8333,
     "w": 6,
     "d": 5,
     "kind": "room",
     "uncertain": "Size not listed"
    },
    {
     "id": "closet",
     "label": "Bifold closet",
     "x": 26.4167,
     "z": 18.8333,
     "w": 5,
     "d": 3.1667,
     "kind": "room",
     "uncertain": "Size not listed"
    },
    {
     "id": "laundry",
     "label": "Laundry + sink",
     "x": 26.4167,
     "z": 22,
     "w": 10,
     "d": 9,
     "kind": "room",
     "uncertain": "Size not listed"
    },
    {
     "id": "eaststore",
     "label": "Unassigned",
     "x": 26.4167,
     "z": 31,
     "w": 10,
     "d": 6,
     "kind": "room",
     "uncertain": "Space east of hall between laundry and the side-deck door; use not observed"
    },
    {
     "id": "powder",
     "label": "Half bath",
     "x": 17.9167,
     "z": 29.9167,
     "w": 5,
     "d": 7,
     "kind": "bath",
     "note": "Last door on the right (west) walking south, just before the T (owner)",
     "sizeNote": "5×7 size approximate"
    },
    {
     "id": "garage",
     "label": "Attached garage",
     "x": 2.4167,
     "z": 41,
     "w": 24,
     "d": 24,
     "kind": "garage",
     "use": "Model Y + Jenny’s XT5",
     "uncertain": "MLS 2-car vs seller 2.5-car; size not listed"
    },
    {
     "id": "patiow",
     "label": "Stone patio",
     "x": -10,
     "z": 17,
     "w": 10,
     "d": 24,
     "kind": "outdoor",
     "uncertain": "Patio extent approximate"
    },
    {
     "id": "patios",
     "label": "Front stone patio (L)",
     "x": 0,
     "z": 30.4167,
     "w": 17.9167,
     "d": 10.5833,
     "kind": "outdoor",
     "uncertain": "Patio extent approximate"
    },
    {
     "id": "frontwalk",
     "label": "Front walk",
     "x": 17.9167,
     "z": 36.9167,
     "w": 5,
     "d": 4.0833,
     "kind": "outdoor",
     "note": "Outside the T’s west door, toward the front of the house",
     "uncertain": "Outdoor extent approximate"
    },
    {
     "id": "sidedeck",
     "label": "Small side deck",
     "x": 26.4167,
     "z": 37,
     "w": 10,
     "d": 8,
     "kind": "outdoor",
     "use": "220V reported · spa options",
     "uncertain": "Deck position / size approximate",
     "note": "Reached by the T’s east (left) door"
    },
    {
     "id": "wrapdeck",
     "label": "Large north deck",
     "x": -10,
     "z": -12,
     "w": 54,
     "d": 12,
     "kind": "outdoor",
     "uncertain": "Deck extent approximate"
    },
    {
     "id": "deckwest",
     "label": "Deck wrap",
     "x": -10,
     "z": 0,
     "w": 10,
     "d": 17,
     "kind": "outdoor",
     "uncertain": "Wrap extent / steps approximate"
    }
   ],
   "windows": [
    {
     "axis": "z",
     "at": 0,
     "start": 3,
     "end": 19.5,
     "room": "living"
    },
    {
     "axis": "z",
     "at": 0,
     "start": 29,
     "end": 41,
     "room": "primary"
    },
    {
     "axis": "x",
     "at": 0,
     "start": 19,
     "end": 21,
     "room": "dining"
    }
   ],
   "links": [
    {
     "a": "living",
     "b": "kitchen",
     "axis": "z",
     "at": 17,
     "start": 10,
     "end": 21.5,
     "kind": "open"
    },
    {
     "a": "kitchen",
     "b": "dining",
     "axis": "x",
     "at": 8.6667,
     "start": 18.5,
     "end": 29,
     "kind": "open"
    },
    {
     "a": "living",
     "b": "stair",
     "axis": "z",
     "at": 3,
     "start": 19.9167,
     "end": 22.9167,
     "kind": "open",
     "note": "stair foot near north windows"
    },
    {
     "a": "living",
     "b": "hall",
     "axis": "x",
     "at": 22.9167,
     "start": 14,
     "end": 17,
     "kind": "open"
    },
    {
     "a": "hall",
     "b": "stair",
     "axis": "x",
     "at": 22.9167,
     "start": 10.5,
     "end": 13.5,
     "kind": "door",
     "uncertain": "Down-flight entry from hall inferred"
    },
    {
     "a": "kitchen",
     "b": "hall",
     "axis": "x",
     "at": 22.9167,
     "start": 20,
     "end": 26,
     "kind": "open"
    },
    {
     "a": "hall",
     "b": "primary",
     "axis": "x",
     "at": 26.4167,
     "start": 9,
     "end": 12,
     "kind": "door",
     "uncertain": "Primary door is on the hall’s east side; exact offset unverified"
    },
    {
     "a": "primary",
     "b": "primarybath",
     "axis": "z",
     "at": 13.8333,
     "start": 36,
     "end": 39,
     "kind": "door",
     "uncertain": "Offset unverified"
    },
    {
     "a": "hall",
     "b": "pantry",
     "axis": "x",
     "at": 26.4167,
     "start": 15,
     "end": 17.5,
     "kind": "door"
    },
    {
     "a": "hall",
     "b": "closet",
     "axis": "x",
     "at": 26.4167,
     "start": 19.2,
     "end": 21.6,
     "kind": "door"
    },
    {
     "a": "hall",
     "b": "laundry",
     "axis": "x",
     "at": 26.4167,
     "start": 24,
     "end": 27,
     "kind": "door"
    },
    {
     "a": "hall",
     "b": "powder",
     "axis": "x",
     "at": 22.9167,
     "start": 32.5,
     "end": 35,
     "kind": "door",
     "note": "half bath · last door on right walking south"
    },
    {
     "a": "hall",
     "b": "garage",
     "axis": "z",
     "at": 41,
     "start": 23.2,
     "end": 26.1,
     "kind": "door",
     "note": "garage door at the south end of the T"
    },
    {
     "a": "dining",
     "b": "patiow",
     "axis": "x",
     "at": 0,
     "start": 21,
     "end": 27,
     "kind": "slider"
    },
    {
     "a": "hall",
     "b": "frontwalk",
     "axis": "x",
     "at": 22.9167,
     "start": 37.4,
     "end": 40.4,
     "kind": "glassdoor",
     "note": "T · west door toward front of house"
    },
    {
     "a": "garage",
     "b": "frontwalk",
     "axis": "z",
     "at": 41,
     "start": 18.4,
     "end": 21.4,
     "kind": "door",
     "note": "white half-glass corner door",
     "uncertain": "Interior destination of this corner door unverified"
    },
    {
     "a": "hall",
     "b": "sidedeck",
     "axis": "x",
     "at": 26.4167,
     "start": 37.4,
     "end": 40.4,
     "kind": "glassdoor",
     "note": "T · east door to small side deck"
    },
    {
     "a": "wrapdeck",
     "b": "deckwest",
     "axis": "z",
     "at": 0,
     "start": -10,
     "end": 0,
     "kind": "open"
    },
    {
     "a": "deckwest",
     "b": "patiow",
     "axis": "z",
     "at": 17,
     "start": -9,
     "end": -6,
     "kind": "open",
     "note": "exterior steps",
     "uncertain": "Exterior route approximate"
    },
    {
     "a": "frontwalk",
     "b": "patios",
     "axis": "x",
     "at": 17.9167,
     "start": 36.9167,
     "end": 41,
     "kind": "open"
    }
   ]
  },
  {
   "id": "upper",
   "name": "Upper floor",
   "elevation": 20,
   "rooms": [
    {
     "id": "void",
     "label": "Open to living below",
     "x": 0,
     "z": 0,
     "w": 19.9167,
     "d": 17,
     "kind": "void"
    },
    {
     "id": "stairwell",
     "label": "Stair opening",
     "x": 19.9167,
     "z": 3,
     "w": 3,
     "d": 11,
     "kind": "void"
    },
    {
     "id": "landing",
     "label": "Stair arrival",
     "x": 19.9167,
     "z": 14,
     "w": 3,
     "d": 6.5,
     "kind": "hall"
    },
    {
     "id": "balcony",
     "label": "Balcony hall · rail N",
     "x": 10,
     "z": 17,
     "w": 9.9167,
     "d": 3.5,
     "kind": "hall",
     "open": [
      "n"
     ],
     "uncertain": "Hall width not listed"
    },
    {
     "id": "east",
     "label": "East room",
     "x": 22.9167,
     "z": 8,
     "w": 13,
     "d": 12.5,
     "kind": "room",
     "dim": "13′ × 12′6″",
     "listingRoom": "Bedroom 2?",
     "use": "Clark’s office · desk + Aeron",
     "uncertain": "MLS room-number mapping and footprint registration unverified"
    },
    {
     "id": "upperbath",
     "label": "Full bath",
     "x": 19.5,
     "z": 20.5,
     "w": 8,
     "d": 8,
     "kind": "bath",
     "uncertain": "Size not listed"
    },
    {
     "id": "center",
     "label": "Middle room",
     "x": 10,
     "z": 20.5,
     "w": 9.5,
     "d": 11.0833,
     "kind": "room",
     "dim": "11′1″ × 9′6″",
     "listingRoom": "Bedroom 3?",
     "use": "Jenny’s walk-in closet",
     "uncertain": "MLS room-number mapping and axis unverified"
    },
    {
     "id": "west",
     "label": "West room",
     "x": 0,
     "z": 17,
     "w": 10,
     "d": 12.9167,
     "kind": "room",
     "dim": "12′11″ × 10′",
     "listingRoom": "Bedroom 4?",
     "use": "Jenny’s office",
     "uncertain": "MLS room-number mapping and axis unverified"
    }
   ],
   "windows": [],
   "links": [
    {
     "a": "stairwell",
     "b": "landing",
     "axis": "z",
     "at": 14,
     "start": 19.9167,
     "end": 22.9167,
     "kind": "open",
     "note": "straight flight arrives here"
    },
    {
     "a": "landing",
     "b": "east",
     "axis": "x",
     "at": 22.9167,
     "start": 15.5,
     "end": 18.5,
     "kind": "door",
     "note": "terminal east room"
    },
    {
     "a": "landing",
     "b": "upperbath",
     "axis": "z",
     "at": 20.5,
     "start": 20,
     "end": 22.5,
     "kind": "door",
     "note": "bath straight ahead of stair arrival"
    },
    {
     "a": "landing",
     "b": "balcony",
     "axis": "x",
     "at": 19.9167,
     "start": 17.2,
     "end": 20.3,
     "kind": "open"
    },
    {
     "a": "balcony",
     "b": "center",
     "axis": "z",
     "at": 20.5,
     "start": 12,
     "end": 15,
     "kind": "door",
     "note": "same south wall as bath"
    },
    {
     "a": "balcony",
     "b": "west",
     "axis": "x",
     "at": 10,
     "start": 17.4,
     "end": 20.2,
     "kind": "door",
     "note": "terminal west room"
    }
   ]
  },
  {
   "id": "lower",
   "name": "Lower walk-out level",
   "elevation": 0,
   "rooms": [
    {
     "id": "lowerliving",
     "label": "Lower living",
     "x": 0.9167,
     "z": 0,
     "w": 19,
     "d": 16.8333,
     "kind": "room",
     "dim": "19′ × 16′10″",
     "use": "Florida sectional / TV"
    },
    {
     "id": "lowerstairs",
     "label": "Stair up to main",
     "x": 19.9167,
     "z": 3,
     "w": 3,
     "d": 11,
     "kind": "stairs",
     "uncertain": "Stacked under main stair (inferred)"
    },
    {
     "id": "understair",
     "label": "Understair storage",
     "x": 19.9167,
     "z": 14,
     "w": 3,
     "d": 2.8333,
     "kind": "room",
     "uncertain": "Size approximate"
    },
    {
     "id": "lowerhall",
     "label": "Hall",
     "x": 15.9167,
     "z": 16.8333,
     "w": 4,
     "d": 16.1667,
     "kind": "hall",
     "uncertain": "Size not listed"
    },
    {
     "id": "bed1",
     "label": "Bedroom 1 (pine wall)",
     "x": 0.9167,
     "z": 16.8333,
     "w": 9.0833,
     "d": 12.1667,
     "kind": "room",
     "use": "Guest bedroom",
     "uncertain": "Size not listed"
    },
    {
     "id": "lowerbath",
     "label": "Bath",
     "x": 10,
     "z": 16.8333,
     "w": 5.9167,
     "d": 7.6667,
     "kind": "bath",
     "uncertain": "Size not listed"
    },
    {
     "id": "bed2",
     "label": "Bedroom 2",
     "x": 19.9167,
     "z": 16.8333,
     "w": 11,
     "d": 12,
     "kind": "room",
     "use": "Guest bedroom",
     "uncertain": "Size not listed"
    },
    {
     "id": "kitchenette",
     "label": "Kitchenette",
     "x": 8,
     "z": 33,
     "w": 16,
     "d": 10,
     "kind": "room",
     "uncertain": "Size not listed"
    },
    {
     "id": "mechanical",
     "label": "Mechanical / storage",
     "x": 24,
     "z": 33,
     "w": 10,
     "d": 10,
     "kind": "room",
     "uncertain": "Size not listed"
    },
    {
     "id": "coveredpatio",
     "label": "Covered patio under deck",
     "x": 0,
     "z": -12,
     "w": 22.9167,
     "d": 12,
     "kind": "outdoor"
    },
    {
     "id": "sideyard",
     "label": "Side-yard exit",
     "x": 0,
     "z": 33,
     "w": 8,
     "d": 10,
     "kind": "outdoor",
     "uncertain": "Which exterior wall is unverified"
    }
   ],
   "windows": [
    {
     "axis": "z",
     "at": 0,
     "start": 7,
     "end": 17,
     "room": "lowerliving"
    }
   ],
   "links": [
    {
     "a": "lowerstairs",
     "b": "lowerliving",
     "axis": "x",
     "at": 19.9167,
     "start": 3,
     "end": 6,
     "kind": "open",
     "note": "stair foot"
    },
    {
     "a": "lowerliving",
     "b": "coveredpatio",
     "axis": "z",
     "at": 0,
     "start": 2,
     "end": 5,
     "kind": "glassdoor",
     "note": "half-glass door beside window bank"
    },
    {
     "a": "lowerliving",
     "b": "bed1",
     "axis": "z",
     "at": 16.8333,
     "start": 1.5,
     "end": 4.5,
     "kind": "door",
     "note": "wooden door at living corner"
    },
    {
     "a": "bed1",
     "b": "lowerbath",
     "axis": "x",
     "at": 10,
     "start": 18,
     "end": 21,
     "kind": "door",
     "note": "bath door B"
    },
    {
     "a": "lowerbath",
     "b": "lowerhall",
     "axis": "x",
     "at": 15.9167,
     "start": 18,
     "end": 21,
     "kind": "door",
     "note": "bath door A"
    },
    {
     "a": "lowerhall",
     "b": "lowerliving",
     "axis": "z",
     "at": 16.8333,
     "start": 15.9167,
     "end": 19.9167,
     "kind": "open",
     "note": "wide opening"
    },
    {
     "a": "lowerhall",
     "b": "bed2",
     "axis": "x",
     "at": 19.9167,
     "start": 24,
     "end": 27,
     "kind": "door"
    },
    {
     "a": "lowerhall",
     "b": "kitchenette",
     "axis": "z",
     "at": 33,
     "start": 16.5,
     "end": 19.5,
     "kind": "open",
     "note": "hall end"
    },
    {
     "a": "kitchenette",
     "b": "mechanical",
     "axis": "x",
     "at": 24,
     "start": 36,
     "end": 39,
     "kind": "door"
    },
    {
     "a": "kitchenette",
     "b": "sideyard",
     "axis": "x",
     "at": 8,
     "start": 37,
     "end": 40,
     "kind": "glassdoor",
     "note": "half-glass exit to retaining-wall slope",
     "uncertain": "Exterior wall unverified"
    }
   ]
  }
 ]
};root.DEAL_LAYOUT=data;if(typeof module!=="undefined")module.exports=data;})(typeof window!=="undefined"?window:globalThis);
