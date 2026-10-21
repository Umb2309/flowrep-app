export type Category = 'Free Weights' | 'Machines' | 'Cables' | 'Bodyweight';

export type Equipment = {
  id: string;
  name: string;
  tag: string;
  type: Category;
  count: number;
  color: string;
  muscles: string;
  what: string;
  setup: string[];
  position: string[];
  movement: string[];
  breathing: string;
  mistakes: string[];
  safety: string[];
};

const BREATH = 'Breathe out during the effort phase (when you push or pull) and breathe in during the return phase. Never hold your breath.';

export const EQUIPMENT: Equipment[] = [
  {
    id: 'dumbbells',
    name: 'Dumbbells',
    tag: 'ARMS & CHEST',
    type: 'Free Weights',
    count: 18,
    color: '#2E4A4C',
    muscles: 'your arms, chest and shoulders',
    what: 'Hand-held weights that come in pairs and sit on a rack in order of weight. Each arm works on its own, which helps balance strength from side to side.',
    setup: [
      'Pick a weight you can move with smooth control for every rep. Start lighter than you think you need.',
      'Lift them with your legs: bend your knees, keep your back straight and pick both up together.',
      'Find your spot first: a bench, or a clear space with your feet shoulder-width apart.',
    ],
    position: [
      'Stand or sit tall with your chest up and shoulders relaxed.',
      'Keep your wrists straight, in line with your forearms.',
      'Tighten your stomach lightly so your back stays still.',
    ],
    movement: [
      'Lift with control, without swinging the weights.',
      'Pause briefly at the top of the movement.',
      'Lower slowly over two to three seconds instead of dropping the weight.',
    ],
    breathing: BREATH,
    mistakes: ['Swinging the weights with momentum', 'Using a weight that is too heavy for good form', 'Holding your breath'],
    safety: [
      'Never drop dumbbells from height.',
      'Return them to the rack when you finish so nobody trips.',
      'Stop if you feel sharp pain. Normal muscle effort feels different.',
    ],
  },
  {
    id: 'kettlebells',
    name: 'Kettlebells',
    tag: 'FULL BODY',
    type: 'Free Weights',
    count: 12,
    color: '#8A5A3C',
    muscles: 'your hips, legs, back and core',
    what: 'A cast-iron weight with a handle on top. Because the weight hangs below your hand, it works well for swings, squats and carrying exercises.',
    setup: [
      'Choose a lighter bell while you learn the movement.',
      'Place it on the floor in front of you and stand with feet slightly wider than your hips.',
      'Hinge at your hips with a flat back and grip the handle with both hands.',
    ],
    position: [
      'Keep your chest proud and your back flat.',
      'Weight sits in your heels and mid-foot.',
      'Keep your arms relaxed. The power comes from your hips.',
    ],
    movement: [
      'Drive your hips forward to stand tall.',
      'Let the bell swing, do not lift it with your arms.',
      'Guide it back between your legs by hinging at the hips again.',
    ],
    breathing: 'Breathe out sharply as your hips drive forward, and breathe in as the bell swings back down.',
    mistakes: ['Squatting the swing instead of hinging', 'Lifting with the arms', 'Rounding the lower back'],
    safety: [
      'Keep a clear space around you.',
      'If you lose control, let go and step back instead of chasing the bell.',
      'Do not use cracked or loose-handled kettlebells.',
    ],
  },
  {
    id: 'cable-machine',
    name: 'Cable Machine',
    tag: 'UPPER BODY',
    type: 'Cables',
    count: 24,
    color: '#3C5E7A',
    muscles: 'your back, chest, shoulders and arms',
    what: 'A tall frame with weight stacks and adjustable pulleys. Cables give smooth, steady resistance in almost any direction.',
    setup: [
      'Select the right attachment: a bar, rope or single handle.',
      'Adjust the pulley height. Low for curls and rows, high for pulldowns and triceps pushdowns.',
      'Choose a resistance by moving the pin in the weight stack, starting light.',
      'Step into position so the cable pulls in a straight line.',
    ],
    position: [
      'Stand with feet shoulder-width apart and one foot slightly forward for balance.',
      'Keep your chest up and your core braced.',
      'Hold the handle with a firm grip and a straight wrist.',
    ],
    movement: [
      'Move only the part your exercise targets, keeping the rest of your body still.',
      'Control the weight on the way back. Do not let the stack slam.',
      'Use the full range of motion without forcing the end of the movement.',
    ],
    breathing: BREATH,
    mistakes: ['Using body momentum to move the weight', 'Letting the weight stack crash down', 'Setting the pulley at the wrong height'],
    safety: [
      'Check the pin is fully inserted before each set.',
      'Check the cable and attachment for fraying or damage.',
      'Let go of the handle gently. Never release it under tension.',
    ],
  },
  {
    id: 'barbell',
    name: 'Barbell',
    tag: 'LEGS & BACK',
    type: 'Free Weights',
    count: 15,
    color: '#5A3C3C',
    muscles: 'your legs, back, chest and shoulders',
    what: 'A long steel bar you load with weight plates on both ends. It lets you lift heavier than with most other equipment, so good form matters most.',
    setup: [
      'Start with the empty bar to learn the movement.',
      'Add plates evenly to both sides, then fit collars so they cannot slide.',
      'For rack exercises, set the bar height and safety arms before you load it.',
    ],
    position: [
      'Stand with feet about shoulder-width apart, under or close to the bar.',
      'Grip the bar evenly with your hands the same distance from the middle.',
      'Keep your back flat, chest up and core tight.',
    ],
    movement: [
      'Lift with steady control, keeping the bar close to your body.',
      'Stand fully tall at the top without leaning back.',
      'Lower the bar along the same path under control.',
    ],
    breathing: 'Take a deep breath in before the effort, brace your core, then breathe out as you pass the hardest part of the lift.',
    mistakes: ['Loading plates unevenly', 'Rounding the back', 'Lifting heavy without a spotter or safety arms'],
    safety: [
      'Always use collars and load both sides evenly.',
      'Use safety arms or a spotter for heavy squats and presses.',
      'Unload the bar and return the plates when you finish.',
    ],
  },
  {
    id: 'leg-press',
    name: 'Leg Press',
    tag: 'LEGS',
    type: 'Machines',
    count: 8,
    color: '#4A5A44',
    muscles: 'your quads, glutes and hamstrings',
    what: 'A seated machine where you push a weighted platform away with your feet. The seat supports your back, so it is a friendly way to train your legs.',
    setup: [
      'Sit back and adjust the seat so your knees bend at about 90 degrees at the bottom.',
      'Load the plates evenly or set the pin on the weight stack, starting light.',
      'Check the safety stops are set where the manufacturer recommends before you begin.',
    ],
    position: [
      'Place your feet shoulder-width apart, in the middle of the platform.',
      'Keep your head, back and hips flat against the pads.',
      'Hold the side handles lightly. Do not pull on them.',
    ],
    movement: [
      'Push through your whole foot until your legs are almost straight.',
      'Do not lock your knees at the top.',
      'Bend your knees slowly to bring the platform back under control.',
    ],
    breathing: 'Breathe out as you push the platform away and breathe in as you bring it back.',
    mistakes: ['Locking out the knees', 'Letting the hips lift off the seat', 'Using more weight than you can control'],
    safety: [
      'Do not let your knees collapse inward.',
      'Stop the set if your lower back lifts off the pad.',
      'Set the safety stops back correctly when you finish.',
    ],
  },
  {
    id: 'smith-machine',
    name: 'Smith Machine',
    tag: 'FULL BODY',
    type: 'Machines',
    count: 14,
    color: '#6A6A6A',
    muscles: 'your legs, chest and shoulders',
    what: 'A barbell fixed on vertical rails so it only moves up and down. The rails add stability, which makes it a good place for beginners to learn squats and presses.',
    setup: [
      'Set the bar at a height that lets you start in a comfortable position.',
      'Add weight evenly to both ends. Start light.',
      'Learn how to hook and unhook the bar by rotating your wrists. Check the safety catches are set at a sensible height.',
    ],
    position: [
      'Stand with the bar over your shoulders or mid-chest depending on the exercise.',
      'Place your feet slightly forward of the bar for squats so you stay balanced.',
      'Keep your core braced and chest up.',
    ],
    movement: [
      'Move the bar straight up and down along its rails.',
      'Lower slowly under control.',
      'Rotate your wrists to hook the bar on the rack to finish the set.',
    ],
    breathing: BREATH,
    mistakes: ['Setting the feet too far back', 'Forgetting to set the safety catches', 'Using too much weight because the rails feel safe'],
    safety: [
      'Set the safety catches before every set.',
      'Practise hooking and unhooking the bar with light weight first.',
      'Ask a staff member if you are not sure how the hooks work.',
    ],
  },
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    tag: 'BACK',
    type: 'Machines',
    count: 10,
    color: '#3C4E7A',
    muscles: 'your upper back and lats',
    what: 'A seated machine with a bar on a high cable. You pull the bar down toward your chest, which builds the big muscles of your back.',
    setup: [
      'Select a weight that lets you pull the bar to your chest with control.',
      'Adjust the thigh pad so your legs are held firmly under it.',
      'Stand up, take a wide grip on the bar, then sit down with it held above you.',
    ],
    position: [
      'Sit tall with feet flat on the floor and thighs under the pads.',
      'Lean back very slightly and keep your chest up.',
      'Hold the bar a little wider than shoulder-width.',
    ],
    movement: [
      'Pull your elbows down and slightly back, bringing the bar to your upper chest.',
      'Squeeze your back muscles for a moment.',
      'Let the bar rise slowly until your arms are straight again.',
    ],
    breathing: 'Breathe out as you pull the bar down and breathe in as the bar goes back up.',
    mistakes: ['Pulling the bar behind the neck', 'Leaning back too far and swinging', 'Using the arms instead of the back'],
    safety: [
      'Pull to your chest, never behind your head.',
      'Return the bar slowly so the weight stack does not crash.',
      'Keep your feet on the floor and thighs under the pad.',
    ],
  },
  {
    id: 'chest-fly-machine',
    name: 'Chest Fly Machine',
    tag: 'CHEST',
    type: 'Machines',
    count: 6,
    color: '#5C3C7A',
    muscles: 'your chest and the front of your shoulders',
    what: 'Also called the pec deck. You sit with your back against a pad and bring two handles together in front of you, which isolates your chest.',
    setup: [
      'Adjust the seat so the handles are at about chest height.',
      'Set the pin on a light weight.',
      'Adjust the arm start position if the machine allows it, so your arms are not stretched too far back.',
    ],
    position: [
      'Sit with your back and head flat against the pad.',
      'Hold the handles with your elbows slightly bent.',
      'Keep your shoulders down and away from your ears.',
    ],
    movement: [
      'Bring the handles together in a smooth arc in front of your chest.',
      'Squeeze your chest for a moment when they meet.',
      'Open your arms back slowly, stopping before you feel a strong stretch in your shoulders.',
    ],
    breathing: 'Breathe out as you bring the handles together and breathe in as you open your arms.',
    mistakes: ['Opening the arms too far back', 'Shrugging the shoulders up', 'Using momentum to swing the handles'],
    safety: [
      'Do not let the weight pull your arms back quickly.',
      'Stop if you feel a pinch in the front of your shoulder.',
      'Start with a light weight until you learn the path of the handles.',
    ],
  },
];