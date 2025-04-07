import * as Ariakit from "@ariakit/react";
import './App.css';
import { Profiler } from 'react';

// Extend Window interface to include our custom property
declare global {
  interface Window {
    renderMetrics: {
      totalRenderTime: number;
      renderCount: number;
    };
  }
}

function App() {
  const listLength = 40;
  const list = Array.from({ length: listLength }, (_, i) => i);

  const onRender = (
    id: string,
    phase: string,
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number
  ) => {
    // Track cumulative render times
    window.renderMetrics = window.renderMetrics || {
      totalRenderTime: 0,
      renderCount: 0
    };
  
    window.renderMetrics.totalRenderTime += actualDuration;
    window.renderMetrics.renderCount++;

    // Log detailed metrics
    // console.log('Render Metrics:', {
    //   id,
    //   phase,
    //   actualDuration,
    //   baseDuration,
    //   startTime,
    //   commitTime,
    //   totalRenderTime: window.renderMetrics.totalRenderTime,
    //   renderCount: window.renderMetrics.renderCount,
    //   averageRenderTime: window.renderMetrics.totalRenderTime / window.renderMetrics.renderCount
    // });
  };

  return (
    <>
      <div>Testing with {listLength} items</div>

      <Profiler id="MenuList" onRender={onRender}>
        {list.map((i) => (
          <Ariakit.MenuProvider key={i}>
            <Ariakit.MenuButton className="button">
              {i} <Ariakit.MenuButtonArrow />
            </Ariakit.MenuButton>
            <Ariakit.Menu gutter={8} className="menu" key={`menu-${i}`}>
              <Ariakit.MenuItem
                className="menu-item"
                onClick={() => alert("Edit")}
              >
                Edit
              </Ariakit.MenuItem>
              <Ariakit.MenuItem className="menu-item">Share</Ariakit.MenuItem>
              <Ariakit.MenuItem className="menu-item" disabled>
                Delete
              </Ariakit.MenuItem>
              <Ariakit.MenuSeparator className="separator" />
              <Ariakit.MenuItem className="menu-item">Report</Ariakit.MenuItem>
            </Ariakit.Menu>
          </Ariakit.MenuProvider>
        ))}
      </Profiler>
    </>
  );
}

export default App;
