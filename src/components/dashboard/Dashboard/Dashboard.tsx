import { DashboardContextProvider } from 'contexts/Dashboard';
import { useBreakpointValue } from 'hooks/useBreakpointValue';
import React from 'react';

import { DashboardLeaderBoard } from '../DashboardLeaderBoard';
import { DashboardOverview } from '../DashboardOverview';
import { DashboardTasks } from '../DashboardTasks';
import { DashboardTiers } from '../DashboardTiers';

export const Dashboard = () => {
  const tiersRef = React.useRef<HTMLDivElement>(null);
  const overviewRef = React.useRef<HTMLDivElement>(null);

  const [boardMaxHeight, setBoardMaxHeight] = React.useState<string>();
  const [tasksMaxHeight, setTasksMaxHeight] = React.useState<string>();

  const isMobile = useBreakpointValue({ MD: false }, true);

  const tiersHeight = tiersRef.current?.clientHeight ?? 0;
  const overviewHeight = overviewRef.current?.clientHeight ?? 0;

  const availableSpace = '100dvh - 9.25rem';
  const tasksMinHeight = !isMobile
    ? '20rem'
    : undefined;

  const boardMinHeight = !isMobile
    ? `calc((${tasksMinHeight} + ${tiersHeight}px) - ${overviewHeight}px)`
    : undefined;

  React.useEffect(() => {
    if (isMobile) {
      setTasksMaxHeight(undefined);
      setBoardMaxHeight(undefined);

      return;
    }

    setTasksMaxHeight(`calc(${availableSpace} - ${tiersHeight}px)`);
    setBoardMaxHeight(`calc(${availableSpace} - ${overviewHeight}px)`);
  }, [isMobile, tiersHeight, overviewHeight]);

  return (
    <DashboardContextProvider>
      <div className="flex max-md:flex-col gap-5">
        <div className="flex-1 flex flex-col gap-5">
          <DashboardOverview ref={overviewRef} />
          <DashboardLeaderBoard minHeight={boardMinHeight} maxHeight={boardMaxHeight} />
        </div>
        <div className="flex-[2] flex flex-col gap-5">
          <DashboardTasks minHeight={tasksMinHeight} maxHeight={tasksMaxHeight} />
          <DashboardTiers ref={tiersRef} />
        </div>
      </div>
    </DashboardContextProvider>
  );
};
