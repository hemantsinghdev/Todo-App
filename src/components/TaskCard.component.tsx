import { Box, Chip, Paper } from "@mui/material"
import { useState } from "react";
import TaskCheck from "./card/TaskCheck";
import TaskTitle from "./card/TaskTitle";
import TaskButtons from "./card/TaskButtons";
import TaskInfo from "./card/TaskInfo";
import TaskDescription from "./card/TaskDescription";
import TaskDates from "./card/TaskDates";
import TaskPriority from "./card/TaskPriority";

const task={
    title: 'Design UI',
    description: 'Finish login screen',
    label: 'Work',
    tags: ['UI', 'Figma'],
    startDate: '2025-07-12',
    endDate: '2025-07-15',
    priority: 'High',
    status: 'pending',
}

const TaskCard = () => {
    const [active, setActive] = useState(false);
  return (
    <Paper
        elevation={0}
        sx={{
            width: 600,
            maxWidth: 800,
            p: 0.5,
            mb: 2,
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'space-between',
        }}
    >
        <TaskCheck/>
        <Box sx={{my:'9px'}}
        flexGrow={1}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        >
            <Box sx={{display: 'flex', alignItems:'flex-start', justifyContent:'space-between'}}>
                <TaskTitle title={task.title}/>
                
                <Box 
                    display="flex" 
                    alignItems="center" justifyContent="flex-end" 
                    sx={{
                        position: 'relative', mx:1
                    }}
                >
                        <TaskInfo active={active} status={task.status} label={task.label}/>
                        <TaskButtons active={active}/>
                </Box>
            </Box>
            
            <TaskDescription active={active} description={task.description}/>
        
            <Box sx={{display: 'flex', justifyContent:'space-between'}}>
                <TaskDates startDate={task.startDate} dueDate={task.endDate}/>
                <Box display="flex" gap={1} sx={{mx: 1}}>
                    {task.tags.map((tag) => (
                        <Chip key={tag} label={`#${tag}`} size="small" />
                    ))}
                    <TaskPriority priority={task.priority} />
                </Box>
            </Box>
        </Box>
    </Paper>
  )
}

export default TaskCard