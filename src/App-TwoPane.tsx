import { useState, useCallback } from 'react';
import {
  FxLayout,
  FxPaneHeader,
  FxPaneHeaderAction,
  FxUserMenu,
  FxUserMenuItem,
} from '@sap-ui/fx-components';
import type {
  FxNavItemConfig,
  FxLayoutChangeDetail,
  FxUserMenuAccountData,
} from '@sap-ui/fx-components';
import { MessageSquare, Compass, Layers, Workflow, Code, Plus, Search, Edit, Trash2, Settings, HelpCircle, Bot } from 'lucide-react';

interface Item {
  id: string;
  name: string;
  description: string;
  status: string;
}

function App() {
  const [mode, setMode] = useState<string>('conversations');
  const [selectedItemId, setSelectedItemId] = useState<string | null>('1');
  const [hideStart, setHideStart] = useState(false);

  const [userMenuAccounts] = useState<FxUserMenuAccountData[]>([
    {
      id: '1',
      avatarInitials: 'JD',
      titleText: 'John Doe',
      subtitleText: 'john.doe@company.com',
      description: 'Software Developer',
      additionalInfo: 'Primary Account',
      selected: true,
    },
  ]);

  const navItems: FxNavItemConfig[] = [
    {
      name: 'conversations',
      text: 'Conversations',
      icon: <MessageSquare className="h-5 w-5" />,
      createActionTooltip: 'New Conversation',
    },
    {
      name: 'discover',
      text: 'Discover',
      icon: <Compass className="h-5 w-5" />,
      noCreateAction: true,
    },
    {
      name: 'spaces',
      text: 'Spaces',
      icon: <Layers className="h-5 w-5" />,
      createActionTooltip: 'New Space',
    },
    {
      name: 'jobs',
      text: 'Jobs',
      icon: <Workflow className="h-5 w-5" />,
      createActionTooltip: 'New Job',
    },
    {
      name: 'develop',
      text: 'Develop',
      icon: <Code className="h-5 w-5" />,
      createActionTooltip: 'New Project',
    },
  ];

  const items: Item[] = [
    { id: '1', name: 'Item One', description: 'First item description', status: 'Active' },
    { id: '2', name: 'Item Two', description: 'Second item description', status: 'Draft' },
    { id: '3', name: 'Item Three', description: 'Third item description', status: 'Completed' },
  ];

  const selectedItem = items.find((item) => item.id === selectedItemId);

  const handleSelectItem = useCallback((itemId: string) => {
    setSelectedItemId(itemId);
  }, []);

  const handleLayoutChange = useCallback((detail: FxLayoutChangeDetail) => {
    if (detail.hideStart !== undefined) {
      setHideStart(detail.hideStart);
    }
  }, []);

  const handleModeChange = useCallback((detail: { mode: string }) => {
    setMode(detail.mode);
  }, []);

  const handleAddClick = useCallback(() => {
    console.log('Create new item');
  }, []);

  const handleNotificationsClick = useCallback((opener: HTMLElement) => {
    console.log('Notifications clicked', opener);
  }, []);

  const handleUserMenuItemClick = useCallback((detail: { text: string }) => {
    console.log('User menu item clicked:', detail.text);
  }, []);

  const handleSignOut = useCallback(() => {
    console.log('Sign out clicked');
  }, []);

  // START PANE - List View
  const startContent = (
    <div style={{ padding: '16px' }}>
      {items.map((item) => {
        const isSelected = selectedItemId === item.id;

        return (
          <div
            key={item.id}
            onClick={() => handleSelectItem(item.id)}
            style={{
              padding: '16px',
              marginBottom: '8px',
              borderRadius: '8px',
              border: `1px solid ${isSelected ? '#5D36FF' : '#e0e0e0'}`,
              backgroundColor: isSelected ? '#f3f0ff' : '#ffffff',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
          >
            <div style={{ fontWeight: '600', marginBottom: '4px' }}>
              {item.name}
            </div>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
              {item.description}
            </div>
            <span
              style={{
                fontSize: '12px',
                padding: '2px 8px',
                borderRadius: '4px',
                backgroundColor:
                  item.status === 'Active' ? '#e8f5e9' :
                  item.status === 'Draft' ? '#fff3e0' :
                  '#f5f5f5',
                color:
                  item.status === 'Active' ? '#2e7d32' :
                  item.status === 'Draft' ? '#e65100' :
                  '#616161',
              }}
            >
              {item.status}
            </span>
          </div>
        );
      })}
    </div>
  );

  // CENTER PANE - Detail View
  const centerContent = selectedItem ? (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '12px', color: '#5D36FF', marginBottom: '4px', fontWeight: '500' }}>
          {mode.toUpperCase()}
        </div>
        <div style={{ fontSize: '24px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
          {selectedItem.name}
        </div>
        <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '16px' }}>
          {selectedItem.description}
        </div>
      </div>

      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        border: '1px solid #E5E7EB',
        padding: '20px',
      }}>
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
            Status
          </div>
          <div style={{ fontSize: '16px', color: '#111827' }}>
            {selectedItem.status}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
            ID
          </div>
          <div style={{ fontSize: '16px', color: '#111827', fontFamily: 'monospace' }}>
            {selectedItem.id}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div style={{
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '16px',
      color: '#999'
    }}>
      <MessageSquare size={64} strokeWidth={1} />
      <div style={{ fontSize: '18px' }}>Select an item from the list</div>
    </div>
  );

  // HEADERS
  const startHeader = (
    <FxPaneHeader pane="start" title="Items">
      <FxPaneHeaderAction icon={<Search className="h-4 w-4" />} text="Search" onClick={() => console.log('Search')} />
      <FxPaneHeaderAction icon={<Plus className="h-4 w-4" />} text="New" onClick={handleAddClick} showText design="Secondary" />
    </FxPaneHeader>
  );

  const centerHeader = (
    <FxPaneHeader pane="center" title={selectedItem?.name || 'No Selection'}>
      {selectedItem && (
        <>
          <FxPaneHeaderAction icon={<Edit className="h-4 w-4" />} text="Edit" onClick={() => console.log('Edit')} />
          <FxPaneHeaderAction icon={<Trash2 className="h-4 w-4" />} text="Delete" onClick={() => setSelectedItemId(null)} priority="alwaysOverflow" />
        </>
      )}
    </FxPaneHeader>
  );

  const userMenu = (
    <FxUserMenu
      accounts={userMenuAccounts}
      showOtherAccounts={false}
      showManageAccount={true}
      onItemClick={handleUserMenuItemClick}
      onSignOutClick={handleSignOut}
      onManageAccountClick={() => console.log('Manage Account')}
    >
      <FxUserMenuItem text="Settings" icon={<Settings className="h-4 w-4" />} />
      <FxUserMenuItem text="AI Notice" icon={<Bot className="h-4 w-4" />} />
      <FxUserMenuItem text="Help" icon={<HelpCircle className="h-4 w-4" />} />
    </FxUserMenu>
  );

  return (
    <FxLayout
      mode={mode}
      navItems={navItems}
      hideStart={hideStart}
      suppressEnd={true}
      startHeader={startHeader}
      centerHeader={centerHeader}
      startContent={startContent}
      centerContent={centerContent}
      onLayoutChange={handleLayoutChange}
      onModeChange={handleModeChange}
      onAddClick={handleAddClick}
      notificationsBadge={3}
      onNotificationsClick={handleNotificationsClick}
      userMenu={userMenu}
    />
  );
}

export default App;
