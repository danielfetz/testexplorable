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
  const stages = ['intro', 'scenario', 'matrix'];
  
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

const SwitzerlandMap = ({ stopBanking }) => (
  <svg viewBox="0 0 100 100" style={{ width: '100%', maxWidth: '400px', margin: '0 auto', display: 'block' }}>
    <path
      d="M20,50 C20,30 30,20 50,20 C70,20 80,30 80,50 C80,70 70,80 50,80 C30,80 20,70 20,50 Z"
      fill="#fffaf0"
      stroke="#4a4a4a"
      strokeWidth="2"
    />
    {!stopBanking && (
      <g>
        <text x="10" y="50" fontSize="10" textAnchor="middle">
          <tspan x="10" dy="0">💰</tspan>
          <animateMotion
            path="M10,50 L90,50"
            dur="3s"
            repeatCount="indefinite"
          />
        </text>
        <text x="90" y="50" fontSize="10" textAnchor="middle">
          <tspan x="90" dy="0">🇨🇭</tspan>
          <animateMotion
            path="M90,50 L10,50"
            dur="3s"
            repeatCount="indefinite"
          />
        </text>
      </g>
    )}
  </svg>
);

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

const InteractiveExplanation = () => {
  // ... (previous state declarations and other functions remain the same)

  const renderScenario = () => (
    <div style={{ textAlign: 'center' }}>
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
          <ActionButton onClick={() => setMobilizeTroops(!mobilizeTroops)} isActive={mobilizeTroops} isLarge>
            Mobilize troops
          </ActionButton>
        </div>
        <div style={{ width: '60%' }}>
          <SwitzerlandMap stopBanking={stopBanking} />
        </div>
      </div>
      <button style={{...buttonStyle, marginTop: '2rem'}} onClick={handleContinue}>
        Continue
      </button>
    </div>
  );

  // ... (rest of the component remains the same)

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h2 style={titleStyle}>Switzerland in World War II</h2>
        {stage === 'intro' && renderIntro()}
        {stage === 'scenario' && renderScenario()}
        {stage === 'matrix' && renderMatrix()}
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
