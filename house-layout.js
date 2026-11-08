/* Shared source for 2D and 3D. No measured dimensions. */
(function(root){const data={
  "version": "2026-11-08-house-v1",
  "status": "All six walkthroughs covered by supplied evidence; schematic geometry awaits visual QA",
  "units": "illustrative feet",
  "warning": "Schematic reconstruction, NOT measured or as-built. All drawn lengths and exact alignments are estimates. No fit guarantees. No surveyed north arrow.",
  "notes": [
    "Doors and room connections follow walkthrough evidence; rectangle proportions do not establish measured size.",
    "* Stair position, handedness and precise inter-level registration remain unverified.",
    "Upper door sequence from stairs: east room, bath, middle room, west room; compass names are speaker-stated.",
    "Furniture is proposed; bathrooms, kitchen and service functions are observed.",
    "Two lower exterior exits: living to covered patio, kitchenette to side yard. Bath access from bedroom 1 and hall only.",
    "Living has windows, NOT an exterior deck door. Reach the large wraparound deck outside via the kitchen/dining slider and stone patio. Outdoor rectangles show access, not surveyed site geometry; mudroom patio access is shown schematically.",
    "Utility exterior is articulated: patio / central utility wall / slider farther left / recessed L-corner with two exterior doors meeting at the corner. The recess and interior return are schematic; exact offsets and door-to-room registration are unverified.",
    "Meter label CL200 is not proof of a 200A main breaker or service capacity. Narrator-reported Spectrum internet speed and availability remain unverified."
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
          "w": 22,
          "d": 18,
          "kind": "room",
          "use": "Piano + cigar lounge"
        },
        {
          "id": "kitchen",
          "label": "Kitchen + island",
          "x": 22,
          "z": 0,
          "w": 14,
          "d": 14,
          "kind": "room"
        },
        {
          "id": "dining",
          "label": "Dining / sunroom",
          "x": 36,
          "z": 0,
          "w": 12,
          "d": 14,
          "kind": "room"
        },
        {
          "id": "mainhall",
          "label": "Service hallway",
          "x": 22,
          "z": 14,
          "w": 6,
          "d": 24,
          "kind": "hall"
        },
        {
          "id": "primary",
          "label": "Primary bedroom",
          "x": 0,
          "z": 18,
          "w": 22,
          "d": 14,
          "kind": "room",
          "use": "Bedroom furniture layout"
        },
        {
          "id": "primarybath",
          "label": "Suite shower bath",
          "x": 0,
          "z": 32,
          "w": 10,
          "d": 8,
          "kind": "bath"
        },
        {
          "id": "pantry",
          "label": "Pantry",
          "x": 28,
          "z": 19,
          "w": 6,
          "d": 6,
          "kind": "room"
        },
        {
          "id": "closet",
          "label": "Bifold closet",
          "x": 28,
          "z": 25,
          "w": 6,
          "d": 4,
          "kind": "room"
        },
        {
          "id": "laundry",
          "label": "Laundry + sink",
          "x": 28,
          "z": 29,
          "w": 12,
          "d": 9,
          "kind": "room"
        },
        {
          "id": "down",
          "label": "Stairs down*",
          "x": 16,
          "z": 34,
          "w": 6,
          "d": 10,
          "kind": "stairs"
        },
        {
          "id": "powder",
          "label": "Half bath",
          "x": 16,
          "z": 44,
          "w": 6,
          "d": 6,
          "kind": "bath"
        },
        {
          "id": "mudroom",
          "label": "Mudroom",
          "x": 22,
          "z": 38,
          "w": 12,
          "d": 12,
          "kind": "hall"
        },
        {
          "id": "garage",
          "label": "Attached garage",
          "x": 40,
          "z": 44,
          "w": 24,
          "d": 24,
          "kind": "garage",
          "use": "Model Y + Jenny’s XT5"
        },
        {
          "id": "up",
          "label": "Open stairs up*",
          "x": 16,
          "z": 10,
          "w": 6,
          "d": 8,
          "kind": "stairs"
        },
        {
          "id": "stonepatio",
          "label": "Recessed exterior corner*",
          "x": 34,
          "z": 38,
          "w": 6,
          "d": 6,
          "kind": "outdoor"
        },
        {
          "id": "sidedeck",
          "label": "Side wood deck",
          "x": 28,
          "z": 50,
          "w": 12,
          "d": 10,
          "kind": "outdoor",
          "use": "Spa alternatives: engineering required"
        },
        {
          "id": "entrypatio",
          "label": "Stone entry patio",
          "x": 48,
          "z": 0,
          "w": 12,
          "d": 14,
          "kind": "outdoor"
        },
        {
          "id": "wrapdeck",
          "label": "Large wraparound deck",
          "x": 48,
          "z": -12,
          "w": 22,
          "d": 12,
          "kind": "outdoor"
        },
        {
          "id": "deckreturn",
          "label": "Deck return",
          "x": 60,
          "z": 0,
          "w": 10,
          "d": 26,
          "kind": "outdoor"
        },
        {
          "id": "mudroomreturn",
          "label": "Service return*",
          "x": 34,
          "z": 44,
          "w": 6,
          "d": 6,
          "kind": "hall"
        }
      ],
      "links": [
        {
          "a": "living",
          "b": "kitchen",
          "axis": "x",
          "at": 22,
          "start": 1,
          "end": 10,
          "kind": "open"
        },
        {
          "a": "kitchen",
          "b": "dining",
          "axis": "x",
          "at": 36,
          "start": 1,
          "end": 12,
          "kind": "open"
        },
        {
          "a": "dining",
          "b": "entrypatio",
          "axis": "x",
          "at": 48,
          "start": 3,
          "end": 10,
          "kind": "slider"
        },
        {
          "a": "living",
          "b": "mainhall",
          "axis": "x",
          "at": 22,
          "start": 14,
          "end": 18,
          "kind": "open"
        },
        {
          "a": "kitchen",
          "b": "mainhall",
          "axis": "z",
          "at": 14,
          "start": 23,
          "end": 27,
          "kind": "open"
        },
        {
          "a": "mainhall",
          "b": "primary",
          "axis": "x",
          "at": 22,
          "start": 23,
          "end": 27,
          "kind": "door"
        },
        {
          "a": "primary",
          "b": "primarybath",
          "axis": "z",
          "at": 32,
          "start": 4,
          "end": 7,
          "kind": "door"
        },
        {
          "a": "mainhall",
          "b": "pantry",
          "axis": "x",
          "at": 28,
          "start": 20,
          "end": 23,
          "kind": "door"
        },
        {
          "a": "mainhall",
          "b": "closet",
          "axis": "x",
          "at": 28,
          "start": 25.5,
          "end": 28.5,
          "kind": "door"
        },
        {
          "a": "mainhall",
          "b": "laundry",
          "axis": "x",
          "at": 28,
          "start": 31,
          "end": 34,
          "kind": "door"
        },
        {
          "a": "mainhall",
          "b": "down",
          "axis": "x",
          "at": 22,
          "start": 34,
          "end": 37,
          "kind": "door"
        },
        {
          "a": "mainhall",
          "b": "mudroom",
          "axis": "z",
          "at": 38,
          "start": 23,
          "end": 27,
          "kind": "open"
        },
        {
          "a": "mudroom",
          "b": "powder",
          "axis": "x",
          "at": 22,
          "start": 45,
          "end": 48,
          "kind": "door"
        },
        {
          "a": "living",
          "b": "up",
          "axis": "z",
          "at": 10,
          "start": 17,
          "end": 21,
          "kind": "open"
        },
        {
          "a": "entrypatio",
          "b": "wrapdeck",
          "axis": "z",
          "at": 0,
          "start": 50,
          "end": 58,
          "kind": "open"
        },
        {
          "a": "entrypatio",
          "b": "deckreturn",
          "axis": "x",
          "at": 60,
          "start": 3,
          "end": 11,
          "kind": "open"
        },
        {
          "a": "wrapdeck",
          "b": "deckreturn",
          "axis": "z",
          "at": 0,
          "start": 61,
          "end": 68,
          "kind": "open"
        },
        {
          "a": "mudroom",
          "b": "mudroomreturn",
          "axis": "x",
          "at": 34,
          "start": 45,
          "end": 49,
          "kind": "open"
        },
        {
          "a": "mudroomreturn",
          "b": "garage",
          "axis": "x",
          "at": 40,
          "start": 45,
          "end": 48,
          "kind": "door"
        },
        {
          "a": "mudroom",
          "b": "stonepatio",
          "axis": "x",
          "at": 34,
          "start": 39,
          "end": 42,
          "kind": "door"
        },
        {
          "a": "mudroomreturn",
          "b": "stonepatio",
          "axis": "z",
          "at": 44,
          "start": 35,
          "end": 38,
          "kind": "door"
        }
      ]
    },
    {
      "id": "upper",
      "name": "Upper floor",
      "elevation": 20,
      "rooms": [
        {
          "id": "east",
          "label": "East room",
          "x": 0,
          "z": 0,
          "w": 16,
          "d": 14,
          "kind": "room",
          "use": "Clark’s office · desk + Aeron"
        },
        {
          "id": "upperbath",
          "label": "Full bathroom",
          "x": 0,
          "z": 14,
          "w": 16,
          "d": 8,
          "kind": "bath"
        },
        {
          "id": "center",
          "label": "Middle room",
          "x": 0,
          "z": 22,
          "w": 16,
          "d": 10,
          "kind": "room",
          "use": "Jenny’s walk-in closet"
        },
        {
          "id": "west",
          "label": "West room",
          "x": 0,
          "z": 32,
          "w": 16,
          "d": 16,
          "kind": "room",
          "use": "Jenny’s office"
        },
        {
          "id": "balcony",
          "label": "Open balcony hallway",
          "x": 16,
          "z": 0,
          "w": 6,
          "d": 48,
          "kind": "hall"
        },
        {
          "id": "upperlanding",
          "label": "Stair arrival*",
          "x": 22,
          "z": 10,
          "w": 6,
          "d": 8,
          "kind": "stairs"
        },
        {
          "id": "void",
          "label": "Open to vaulted living",
          "x": 22,
          "z": 0,
          "w": 18,
          "d": 10,
          "kind": "void"
        }
      ],
      "links": [
        {
          "a": "balcony",
          "b": "east",
          "axis": "x",
          "at": 16,
          "start": 4,
          "end": 7,
          "kind": "door"
        },
        {
          "a": "balcony",
          "b": "upperbath",
          "axis": "x",
          "at": 16,
          "start": 16,
          "end": 19,
          "kind": "door"
        },
        {
          "a": "balcony",
          "b": "center",
          "axis": "x",
          "at": 16,
          "start": 25,
          "end": 28,
          "kind": "door"
        },
        {
          "a": "balcony",
          "b": "west",
          "axis": "x",
          "at": 16,
          "start": 37,
          "end": 40,
          "kind": "door"
        },
        {
          "a": "balcony",
          "b": "upperlanding",
          "axis": "x",
          "at": 22,
          "start": 12,
          "end": 16,
          "kind": "open"
        }
      ]
    },
    {
      "id": "lower",
      "name": "Lower apartment-style level",
      "elevation": 0,
      "rooms": [
        {
          "id": "lowerstairs",
          "label": "Stair arrival*",
          "x": 16,
          "z": 34,
          "w": 6,
          "d": 10,
          "kind": "stairs"
        },
        {
          "id": "landing",
          "label": "Tiled landing",
          "x": 22,
          "z": 34,
          "w": 8,
          "d": 10,
          "kind": "hall"
        },
        {
          "id": "lowerliving",
          "label": "Lower living",
          "x": 30,
          "z": 26,
          "w": 20,
          "d": 18,
          "kind": "room",
          "use": "Florida sectional / TV"
        },
        {
          "id": "lowercorridor",
          "label": "Bedroom corridor",
          "x": 22,
          "z": 0,
          "w": 6,
          "d": 34,
          "kind": "hall"
        },
        {
          "id": "bed1",
          "label": "Bedroom 1",
          "x": 8,
          "z": 20,
          "w": 14,
          "d": 14,
          "kind": "room",
          "use": "Guest bedroom"
        },
        {
          "id": "lowerbath",
          "label": "Shared bathroom",
          "x": 14,
          "z": 12,
          "w": 8,
          "d": 8,
          "kind": "bath"
        },
        {
          "id": "bed2",
          "label": "Bedroom 2",
          "x": 8,
          "z": 0,
          "w": 14,
          "d": 12,
          "kind": "room",
          "use": "Guest bedroom"
        },
        {
          "id": "kitchenette",
          "label": "Kitchenette",
          "x": 22,
          "z": -12,
          "w": 16,
          "d": 12,
          "kind": "room"
        },
        {
          "id": "mechanical",
          "label": "Mechanical / storage",
          "x": 8,
          "z": -12,
          "w": 14,
          "d": 12,
          "kind": "room"
        },
        {
          "id": "coveredpatio",
          "label": "Covered patio",
          "x": 50,
          "z": 26,
          "w": 12,
          "d": 18,
          "kind": "outdoor"
        },
        {
          "id": "sideyard",
          "label": "Side yard exit",
          "x": 38,
          "z": -12,
          "w": 10,
          "d": 12,
          "kind": "outdoor"
        }
      ],
      "links": [
        {
          "a": "lowerstairs",
          "b": "landing",
          "axis": "x",
          "at": 22,
          "start": 37,
          "end": 41,
          "kind": "open"
        },
        {
          "a": "landing",
          "b": "lowerliving",
          "axis": "x",
          "at": 30,
          "start": 36,
          "end": 42,
          "kind": "open"
        },
        {
          "a": "landing",
          "b": "lowercorridor",
          "axis": "z",
          "at": 34,
          "start": 23,
          "end": 27,
          "kind": "open"
        },
        {
          "a": "lowercorridor",
          "b": "bed1",
          "axis": "x",
          "at": 22,
          "start": 25,
          "end": 28,
          "kind": "door"
        },
        {
          "a": "lowercorridor",
          "b": "lowerbath",
          "axis": "x",
          "at": 22,
          "start": 14,
          "end": 17,
          "kind": "door"
        },
        {
          "a": "bed1",
          "b": "lowerbath",
          "axis": "z",
          "at": 20,
          "start": 17,
          "end": 20,
          "kind": "door"
        },
        {
          "a": "lowercorridor",
          "b": "bed2",
          "axis": "x",
          "at": 22,
          "start": 4,
          "end": 7,
          "kind": "door"
        },
        {
          "a": "lowercorridor",
          "b": "kitchenette",
          "axis": "z",
          "at": 0,
          "start": 23,
          "end": 27,
          "kind": "open"
        },
        {
          "a": "kitchenette",
          "b": "mechanical",
          "axis": "x",
          "at": 22,
          "start": -8,
          "end": -5,
          "kind": "door"
        },
        {
          "a": "kitchenette",
          "b": "sideyard",
          "axis": "x",
          "at": 38,
          "start": -8,
          "end": -5,
          "kind": "door"
        },
        {
          "a": "lowerliving",
          "b": "coveredpatio",
          "axis": "x",
          "at": 50,
          "start": 33,
          "end": 39,
          "kind": "glass"
        }
      ]
    }
  ]
};root.DEAL_LAYOUT=data;if(typeof module!=="undefined")module.exports=data;})(typeof window!=="undefined"?window:globalThis);
