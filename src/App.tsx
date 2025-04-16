import * as Ariakit from "@ariakit/react";
import { useState } from "react";
import './App.css';

const TheMenu = ({ renderCount }: { index: number; renderCount: number }) => {
	return (
		<div>
		<Ariakit.MenuProvider>
			<Ariakit.MenuButton className="button">
				Actions {renderCount > 0 && `(rendered ${renderCount} times)`}
				<Ariakit.MenuButtonArrow />
			</Ariakit.MenuButton>
			<Ariakit.Menu gutter={8} className="menu">
				<Ariakit.MenuItem className="menu-item" onClick={() => alert("Edit")}>
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
		</div>
	);
}

function App() {
  const listLength = 200;
  const list = Array.from({ length: listLength }, (_, i) => i);
  const [renderCount, setRenderCount] = useState(0);

  const handleRerender = () => {
    setRenderCount(prev => prev + 1);
  };

  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        <div>Testing with {listLength} items</div>
        <button 
          onClick={handleRerender}
          style={{ 
            marginTop: '10px',
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Force Re-render All Menus ({renderCount} re-renders)
        </button>
      </div>

      {list.map((i) => (
        <TheMenu key={`${i}-${renderCount}`} index={i} renderCount={renderCount} />
      ))}
    </>
  );
}

export default App;
