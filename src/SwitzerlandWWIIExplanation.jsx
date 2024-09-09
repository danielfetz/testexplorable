import React, { useState, useCallback, useEffect, useRef } from 'react';

const DiagonalTransition = ({ isTransitioning, onTransitionEnd }) => {
  const transitionStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom right, transparent 50%, #ffffff 50%)',
    backgroundSize: '250% 250%',
    backgroundPosition: isTransitioning ? '100% 100%' : '0 0',
    transition: 'background-position 0.5s ease-in-out',
    pointerEvents: 'none',
    zIndex: 1000,
    opacity: isTransitioning ? 1 : 0,
  };

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(onTransitionEnd, 500);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, onTransitionEnd]);

  return <div style={transitionStyle} />;
};

const NavigationBar = ({ currentStage, onNavigate, isMusicPlaying, toggleMusic }) => {
  const stages = ['intro', 'scenario', 'matrix', 'airplaneGame'];
  
  const navStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffaf0',
    padding: '10px',
    borderTop: '2px solid #4a4a4a',
    zIndex: 1001,
  };

  const pointStyle = (stage) => ({
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: stage === currentStage ? '#4a4a4a' : '#d3d3d3',
    margin: '0 10px',
    cursor: 'pointer',
  });

  const musicButtonStyle = {
    position: 'absolute',
    left: '20px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '24px',
  };

  return (
    <div style={navStyle}>
      <button onClick={toggleMusic} style={musicButtonStyle}>
        {isMusicPlaying ? '⏸' : '▶️'}
      </button>
      {stages.map((stage, index) => (
        <div
          key={stage}
          style={pointStyle(stage)}
          onClick={() => onNavigate(stage)}
        />
      ))}
    </div>
  );
};

const SwitzerlandMap = ({ stopBanking, mobilizeTroops, growPotatoes }) => {
  const soldiers = [
    { x: 20, y: 15 },
    { x: 80, y: 25 },
    { x: 50, y: 55 },
    { x: 15, y: 40 },
    { x: 85, y: 50 },
  ];

  const potatoes = [
    { x: 30, y: 20 },
    { x: 70, y: 30 },
    { x: 40, y: 50 },
    { x: 25, y: 45 },
    { x: 75, y: 40 },
  ];

  return (
    <svg viewBox="0 0 100 70" style={{ width: '100%', maxWidth: '400px', margin: '0 auto', display: 'block' }}>
      <path
        d="M26,2 C24,2.5 22,3 20.5,4.5 C19,6 17.5,7.5 16,9 C14.5,10.5 13,12 11.5,13.5 C10,15 8.5,16.5 7,18 C5.5,19.5 4,21 2.5,22.5 C1,24 0.5,25.5 1,27 C1.5,28.5 2,30 3.5,31 C5,32 6.5,33 8,34 C9.5,35 11,36 12.5,37 C14,38 15.5,39 17,40 C18.5,41 20,42 21.5,43 C23,44 24.5,45 26,46 C27.5,47 29,48 30.5,49 C32,50 33.5,51 35,52 C36.5,53 38,54 39.5,55 C41,56 42.5,57 44,58 C45.5,59 47,60 48.5,61 C50,62 51.5,63 53,64 C54.5,65 56,66 57.5,67 C59,68 60.5,68.5 62,68 C63.5,67.5 65,67 66.5,66.5 C68,66 69.5,65.5 71,65 C72.5,64.5 74,64 75.5,63.5 C77,63 78.5,62.5 80,62 C81.5,61.5 83,61 84.5,60.5 C86,60 87.5,59.5 89,59 C90.5,58.5 92,58 93.5,57.5 C95,57 96.5,56.5 97.5,55.5 C98.5,54.5 99,53.5 99,52 C99,50.5 98.5,49 98,47.5 C97.5,46 97,44.5 96.5,43 C96,41.5 95.5,40 95,38.5 C94.5,37 94,35.5 93.5,34 C93,32.5 92.5,31 92,29.5 C91.5,28 91,26.5 90.5,25 C90,23.5 89.5,22 89,20.5 C88.5,19 88,17.5 87.5,16 C87,14.5 86.5,13 86,11.5 C85.5,10 85,8.5 84.5,7 C84,5.5 83.5,4 82.5,3 C81.5,2 80.5,1.5 79,1.5 C77.5,1.5 76,2 74.5,2.5 C73,3 71.5,3.5 70,4 C68.5,4.5 67,5 65.5,5.5 C64,6 62.5,6.5 61,7 C59.5,7.5 58,8 56.5,8.5 C55,9 53.5,9.5 52,10 C50.5,10.5 49,11 47.5,11.5 C46,12 44.5,12.5 43,13 C41.5,13.5 40,14 38.5,14.5 C37,15 35.5,15.5 34,16 C32.5,16.5 31,17 29.5,17.5 C28,18 26.5,18.5 26,19 C25.5,19.5 25.5,20 26,20.5 C26.5,21 27,21.5 27.5,22 C28,22.5 28.5,23 29,23.5 C29.5,24 30,24.5 30.5,25 C31,25.5 31.5,26 32,26.5 C32.5,27 33,27.5 33,28 C33,28.5 32.5,29 32,29.5 C31.5,30 31,30.5 30.5,31 C30,31.5 29.5,32 29,32.5 C28.5,33 28,33.5 27.5,34 C27,34.5 26.5,35 26,35.5 C25.5,36 25,36.5 24.5,37 C24,37.5 23.5,38 23,38.5 C22.5,39 22,39.5 22,40 C22,40.5 22.5,41 23,41.5 C23.5,42 24,42.5 24.5,43 C25,43.5 25.5,44 26,44.5 Z"
        fill="#fffaf0"
        stroke="#4a4a4a"
        strokeWidth="0.5"
      />
      {!stopBanking && (
        <g>
          <text x="50" y="35" fontSize="8" textAnchor="middle">
            <tspan x="50" dy="0">💰</tspan>
            <animateMotion
              path="M20,35 H80"
              dur="2s"
              repeatCount="indefinite"
            />
          </text>
          <text x="50" y="35" fontSize="8" textAnchor="middle">
            <tspan x="50" dy="0">💵</tspan>
            <animateMotion
              path="M80,35 H20"
              dur="2s"
              repeatCount="indefinite"
            />
          </text>
        </g>
      )}
      {mobilizeTroops && soldiers.map((soldier, index) => (
        <g key={`soldier-${index}`} transform={`translate(${soldier.x}, ${soldier.y})`}>
          <circle cx="0" cy="0" r="1.5" fill="#4a4a4a" />
          <line x1="0" y1="1.5" x2="0" y2="4" stroke="#4a4a4a" strokeWidth="0.5" />
          <line x1="-1" y1="4" x2="1" y2="4" stroke="#4a4a4a" strokeWidth="0.5" />
          <line x1="0" y1="2.5" x2="-1" y2="4" stroke="#4a4a4a" strokeWidth="0.5" />
          <line x1="0" y1="2.5" x2="1" y2="4" stroke="#4a4a4a" strokeWidth="0.5" />
        </g>
      ))}
      {growPotatoes && potatoes.map((potato, index) => (
        <g key={`potato-${index}`} transform={`translate(${potato.x}, ${potato.y})`}>
          <ellipse cx="0" cy="0" rx="2" ry="1.5" fill="#8B4513" />
          <path d="M-1.5,-0.5 Q0,-1 1.5,-0.5" fill="none" stroke="#4a4a4a" strokeWidth="0.2" />
        </g>
      ))}
    </svg>
  );
};

const ActionButton = ({ onClick, children, isActive, isLarge }) => (
  <button
    onClick={onClick}
    style={{
      fontSize: isLarge ? '1.2rem' : '1rem',
      padding: '0.5rem 1rem',
      backgroundColor: isActive ? '#4a4a4a' : 'white',
      color: isActive ? 'white' : '#4a4a4a',
      border: '2px solid #4a4a4a',
      borderRadius: '5px',
      cursor: 'pointer',
      margin: '0.5rem',
      fontFamily: 'inherit',
      transition: 'all 0.3s ease',
      boxShadow: isActive ? '0 0 10px rgba(0,0,0,0.5)' : 'none',
      width: '100%',
      textAlign: 'left',
    }}
  >
    {children}
  </button>
);

const AirplaneGame = () => {
  const [planes, setPlanes] = useState([]);
  const [score, setScore] = useState({ US: 0, German: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const svgRef = useRef(null);
  const lastUpdateTimeRef = useRef(0);
  const lastSpawnTimeRef = useRef(0);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore({ US: 0, German: 0 });
    setPlanes([]);
    lastUpdateTimeRef.current = 0;
    lastSpawnTimeRef.current = 0;
  };

  useEffect(() => {
    if (gameStarted && !gameOver) {
      let animationFrameId;

      const gameLoop = (timestamp) => {
        if (lastUpdateTimeRef.current === 0) {
          lastUpdateTimeRef.current = timestamp;
          lastSpawnTimeRef.current = timestamp;
        }

        const deltaTime = timestamp - lastUpdateTimeRef.current;

        // Spawn a new plane every 3 seconds
        if (timestamp - lastSpawnTimeRef.current > 1000) {
          if (planes.length < 5) {
            const newPlane = {
              id: Date.now(),
              x: Math.random() * 100,
              y: 0,
              type: Math.random() > 0.5 ? 'US' : 'German',
              speed: 0.016 + Math.random() * 0.040,
            };
            setPlanes(prevPlanes => [...prevPlanes, newPlane]);
          }
          lastSpawnTimeRef.current = timestamp;
        }

        setPlanes(prevPlanes =>
          prevPlanes.map(plane => ({
            ...plane,
            y: plane.y + plane.speed * deltaTime,
          })).filter(plane => plane.y < 70)
        );

        lastUpdateTimeRef.current = timestamp;
        animationFrameId = requestAnimationFrame(gameLoop);
      };

      animationFrameId = requestAnimationFrame(gameLoop);

      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [gameStarted, gameOver, planes]);

  const handleShoot = (event) => {
    if (gameOver || !gameStarted) return;

    const svgRect = svgRef.current.getBoundingClientRect();
    const x = (event.clientX - svgRect.left) / svgRect.width * 100;
    const y = (event.clientY - svgRect.top) / svgRect.height * 70;

    const hitPlane = planes.find(plane => 
      Math.abs(plane.x - x) < 5 && Math.abs(plane.y - y) < 5
    );

    if (hitPlane) {
      setPlanes(prevPlanes => prevPlanes.filter(plane => plane.id !== hitPlane.id));
      setScore(prevScore => ({
        ...prevScore,
        [hitPlane.type]: prevScore[hitPlane.type] + 1
      }));

      if (score.US + score.German + 1 >= 10) {
        setGameOver(true);
        setGameStarted(false);
      }
    }
  };

  return (
    <div style={{ cursor: 'crosshair' }}>
      <svg
        ref={svgRef}
        viewBox="0 0 100 70"
        style={{ width: '100%', maxWidth: '600px', margin: '0 auto', display: 'block', border: '1px solid black' }}
        onClick={handleShoot}
      >
        {/* Switzerland map path */}
        <path
          d="M26,2 C24,2.5 22,3 20.5,4.5 C19,6 17.5,7.5 16,9 C14.5,10.5 13,12 11.5,13.5 C10,15 8.5,16.5 7,18 C5.5,19.5 4,21 2.5,22.5 C1,24 0.5,25.5 1,27 C1.5,28.5 2,30 3.5,31 C5,32 6.5,33 8,34 C9.5,35 11,36 12.5,37 C14,38 15.5,39 17,40 C18.5,41 20,42 21.5,43 C23,44 24.5,45 26,46 C27.5,47 29,48 30.5,49 C32,50 33.5,51 35,52 C36.5,53 38,54 39.5,55 C41,56 42.5,57 44,58 C45.5,59 47,60 48.5,61 C50,62 51.5,63 53,64 C54.5,65 56,66 57.5,67 C59,68 60.5,68.5 62,68 C63.5,67.5 65,67 66.5,66.5 C68,66 69.5,65.5 71,65 C72.5,64.5 74,64 75.5,63.5 C77,63 78.5,62.5 80,62 C81.5,61.5 83,61 84.5,60.5 C86,60 87.5,59.5 89,59 C90.5,58.5 92,58 93.5,57.5 C95,57 96.5,56.5 97.5,55.5 C98.5,54.5 99,53.5 99,52 C99,50.5 98.5,49 98,47.5 C97.5,46 97,44.5 96.5,43 C96,41.5 95.5,40 95,38.5 C94.5,37 94,35.5 93.5,34 C93,32.5 92.5,31 92,29.5 C91.5,28 91,26.5 90.5,25 C90,23.5 89.5,22 89,20.5 C88.5,19 88,17.5 87.5,16 C87,14.5 86.5,13 86,11.5 C85.5,10 85,8.5 84.5,7 C84,5.5 83.5,4 82.5,3 C81.5,2 80.5,1.5 79,1.5 C77.5,1.5 76,2 74.5,2.5 C73,3 71.5,3.5 70,4 C68.5,4.5 67,5 65.5,5.5 C64,6 62.5,6.5 61,7 C59.5,7.5 58,8 56.5,8.5 C55,9 53.5,9.5 52,10 C50.5,10.5 49,11 47.5,11.5 C46,12 44.5,12.5 43,13 C41.5,13.5 40,14 38.5,14.5 C37,15 35.5,15.5 34,16 C32.5,16.5 31,17 29.5,17.5 C28,18 26.5,18.5 26,19 C25.5,19.5 25.5,20 26,20.5 C26.5,21 27,21.5 27.5,22 C28,22.5 28.5,23 29,23.5 C29.5,24 30,24.5 30.5,25 C31,25.5 31.5,26 32,26.5 C32.5,27 33,27.5 33,28 C33,28.5 32.5,29 32,29.5 C31.5,30 31,30.5 30.5,31 C30,31.5 29.5,32 29,32.5 C28.5,33 28,33.5 27.5,34 C27,34.5 26.5,35 26,35.5 C25.5,36 25,36.5 24.5,37 C24,37.5 23.5,38 23,38.5 C22.5,39 22,39.5 22,40 C22,40.5 22.5,41 23,41.5 C23.5,42 24,42.5 24.5,43 C25,43.5 25.5,44 26,44.5 Z"
          fill="#fffaf0"
          stroke="#4a4a4a"
          strokeWidth="0.5"
        />
        {/* Render planes */}
        {planes.map(plane => (
          <g key={plane.id} transform={`translate(${plane.x}, ${plane.y})`}>
            <path d="M-3,-3 L3,3 M-3,3 L3,-3" stroke={plane.type === 'US' ? 'blue' : 'red'} strokeWidth="0.75" />
            <rect x="-1.5" y="-1.5" width="3" height="3" fill={plane.type === 'US' ? 'blue' : 'red'} />
            {plane.type === 'US' ? (
              <text x="4" y="0" fontSize="4" fill="blue">🇺🇸</text>
            ) : (
              <text x="4" y="0" fontSize="4" fill="red">🇩🇪</text>
            )}
          </g>
        ))}
      </svg>
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        {!gameStarted && !gameOver && (
          <button onClick={startGame} style={{ fontSize: '1.2rem', padding: '0.5rem 1rem' }}>
            Start Game
          </button>
        )}
        <p>Score - US: {score.US}, German: {score.German}</p>
        {gameOver && (
          <>
            <p>Game Over! You shot down 10 planes.</p>
            <button onClick={startGame} style={{ fontSize: '1.2rem', padding: '0.5rem 1rem' }}>
              Play Again
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const InteractiveExplanation = () => {
  const [stage, setStage] = useState('intro');
  const [choice, setChoice] = useState(null);
  const [endEconomicRelationship, setEndEconomicRelationship] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextStage, setNextStage] = useState(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  const [stopBanking, setStopBanking] = useState(false);
  const [stopTrade, setStopTrade] = useState(false);
  const [mobilizeTroops, setMobilizeTroops] = useState(false);
  const [growPotatoes, setGrowPotatoes] = useState(false);

  const handleMobilizeTroops = () => {
    setMobilizeTroops(!mobilizeTroops);
  };

  const handleGrowPotatoes = () => {
    setGrowPotatoes(!growPotatoes);
  };

  const payoffs = {
    germany: {
      dontInvade: endEconomicRelationship ? -50 : 0,
      invade: endEconomicRelationship ? 0 : -50,
    },
    switzerland: {
      dontInvade: endEconomicRelationship ? -50 : 0,
      invade: -100,
    },
  };

  const handleStageChange = useCallback((newStage) => {
    if (isTransitioning || newStage === stage) return;
    setIsTransitioning(true);
    setNextStage(newStage);
  }, [isTransitioning, stage]);

  const handleTransitionEnd = useCallback(() => {
    setStage(nextStage);
    setIsTransitioning(false);
    setNextStage(null);
  }, [nextStage]);

  const toggleMusic = useCallback(() => {
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  }, [isMusicPlaying]);

  useEffect(() => {
    audioRef.current = new Audio('https://github.com/ncase/trust/raw/gh-pages/assets/sounds/bg_music.mp3');
    audioRef.current.loop = true;
    return () => {
      audioRef.current.pause();
      audioRef.current = null;
    };
  }, []);

  const handleContinue = () => {
    let choice;
    if (mobilizeTroops && (stopBanking || stopTrade)) {
      choice = 1; // Mobilize troops and stop trade
    } else if (!mobilizeTroops && (stopBanking || stopTrade)) {
      choice = 2; // Not mobilize troops and stop trade
    } else if (mobilizeTroops && !stopBanking && !stopTrade) {
      choice = 3; // Mobilize troops and continue trade
    } else {
      choice = 4; // Not mobilize troops and continue trade
    }
    setChoice(choice);
    handleStageChange('matrix');
  };

  const pageStyle = {
    fontFamily: '"Comic Sans MS", cursive, sans-serif',
    backgroundColor: '#fffaf0',
    minHeight: '100vh',
    padding: '2rem',
    paddingBottom: '4rem',
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    marginBottom: '40px',
    position: 'relative',
    zIndex: 1,
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: '#4a4a4a',
  };

  const textStyle = {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    marginBottom: '1rem',
    textAlign: 'left',
  };

  const buttonStyle = {
    fontSize: '1.2rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#4a4a4a',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'block',
    margin: '1rem auto',
    fontFamily: 'inherit',
    width: '80%',
    maxWidth: '400px',
    textAlign: 'center',
  };

  const checkboxContainerStyle = {
    marginBottom: '1.5rem',
    fontSize: '1.2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const checkboxStyle = {
    marginRight: '0.5rem',
    width: '20px',
    height: '20px',
  };

  const tableStyle = {
    borderCollapse: 'separate',
    borderSpacing: '0',
    width: '100%',
    fontSize: '1.2rem',
  };

  const cellStyle = {
    border: '2px solid #4a4a4a',
    padding: '1rem',
    textAlign: 'center',
    position: 'relative',
    backgroundColor: '#fff',
  };

  const headerCellStyle = {
    ...cellStyle,
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  };

  const leftHeaderCellStyle = {
    ...headerCellStyle,
    textAlign: 'left',
  };

  const sketchBorder = {
    position: 'absolute',
    top: '-5px',
    left: '-5px',
    right: '-5px',
    bottom: '-5px',
    border: '2px solid #4a4a4a',
    borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
    pointerEvents: 'none',
  };

  const renderIntro = () => (
    <>
      <h2 style={titleStyle}>Switzerland in World War II</h2>
      <p style={textStyle}>
        During World War II, Switzerland remained untouched while war ravaged throughout the European continent.
      </p>
      <p style={textStyle}>
        Sure, Switzerland was useful for Nazi Germany as purchaser of gold, and as a hiding place for stolen artworks and jewellery.
      </p>
      <p style={textStyle}>
        But Switzerland purchased even larger quantities of gold from Allied powers, and from 1942 onwards was home to a US intelligence agency base. Therefore one has to wonder why Nazi Germany never followed through with its countless plans to invade Switzerland when they still realistically could before being embattled to such an extent that they couldn't spare any troops.
      </p>
      <p style={textStyle}>
        So how did Switzerland, a country so despised by Hitler, because it had all the characters he so hated: decentralized political power, no great leader fetish - how did it manage to not get invaded?
      </p>
      <p style={textStyle}>
        It can be explained by a combination of military/economic deterrence, economic concessions to Germany and good fortune as larger events during the war delayed an invasion. But <em>deterrence</em> is what interests us today. So, to understand all of this...
      </p>
      <button style={buttonStyle} onClick={() => handleStageChange('scenario')}>
        Next
      </button>
    </>
  );

  const renderScenario = () => (
    <div style={{ textAlign: 'center' }}>
      <h2 style={titleStyle}>Switzerland's Dilemma</h2>
      <p style={textStyle}>
        It's 1939. Germany starts its invasion of Poland.
        What would you do as Switzerland if your goal is keeping 
        your neutral status and not get involved in the war?
      </p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <div style={{ width: '40%', marginRight: '2rem' }}>
            <ActionButton onClick={() => setStopBanking(!stopBanking)} isActive={stopBanking}>
              Stop banking and financial transactions
            </ActionButton>
            <ActionButton onClick={() => setStopTrade(!stopTrade)} isActive={stopTrade}>
              Stop cross-border trade
            </ActionButton>
            <ActionButton onClick={handleMobilizeTroops} isActive={mobilizeTroops} isLarge>
              Mobilize troops
            </ActionButton>
            <ActionButton onClick={handleGrowPotatoes} isActive={growPotatoes} isLarge>
              Start growing potatoes
            </ActionButton>
          </div>
          <div style={{ width: '60%' }}>
            <SwitzerlandMap 
              stopBanking={stopBanking} 
              mobilizeTroops={mobilizeTroops} 
              growPotatoes={growPotatoes}
            />
          </div>
        </div>
      <button style={{...buttonStyle, marginTop: '2rem'}} onClick={handleContinue}>
        Continue
      </button>
    </div>
  );

  const renderMatrix = () => (
    <>
      <h2 style={titleStyle}>Payoff Matrix</h2>
      <div style={checkboxContainerStyle}>
        <label>
          <input
            type="checkbox"
            checked={endEconomicRelationship}
            onChange={(e) => setEndEconomicRelationship(e.target.checked)}
            style={checkboxStyle}
          />
          Switzerland ends economic relationship
        </label>
      </div>
      
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerCellStyle}><div style={sketchBorder}></div></th>
            <th style={headerCellStyle}><div style={sketchBorder}></div>Don't Invade</th>
            <th style={headerCellStyle}><div style={sketchBorder}></div>Invade</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th style={leftHeaderCellStyle}><div style={sketchBorder}></div>Germany</th>
            <td style={cellStyle}><div style={sketchBorder}></div>{payoffs.germany.dontInvade}</td>
            <td style={cellStyle}><div style={sketchBorder}></div>{payoffs.germany.invade}</td>
          </tr>
          <tr>
            <th style={leftHeaderCellStyle}><div style={sketchBorder}></div>Switzerland</th>
            <td style={cellStyle}><div style={sketchBorder}></div>{payoffs.switzerland.dontInvade}</td>
            <td style={cellStyle}><div style={sketchBorder}></div>{payoffs.switzerland.invade}</td>
          </tr>
        </tbody>
      </table>
    </>
  );

  const renderAirplaneGame = () => (
    <>
      <h2 style={titleStyle}>Defend Swiss Airspace</h2>
      <p style={textStyle}>
        Click on the airplanes to shoot them down. Be careful not to violate Swiss neutrality!
      </p>
      <AirplaneGame />
    </>
  );

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        {stage === 'intro' && renderIntro()}
        {stage === 'scenario' && renderScenario()}
        {stage === 'matrix' && renderMatrix()}
        {stage === 'airplaneGame' && renderAirplaneGame()}
      </div>
      <NavigationBar 
        currentStage={stage} 
        onNavigate={handleStageChange}
        isMusicPlaying={isMusicPlaying}
        toggleMusic={toggleMusic}
      />
      <DiagonalTransition isTransitioning={isTransitioning} onTransitionEnd={handleTransitionEnd} />
    </div>
  );
};

export default InteractiveExplanation;
