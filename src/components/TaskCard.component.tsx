import { Box, Chip, ClickAwayListener, Paper } from "@mui/material"
import { useEffect, useState } from "react";
import TaskCheck from "./card/TaskCheck";
import TaskTitle from "./card/TaskTitle";
import TaskButtons from "./card/TaskButtons";
import TaskInfo from "./card/TaskInfo";
import TaskDescription from "./card/TaskDescription";
import TaskDates from "./card/TaskDates";
import TaskPriority from "./card/TaskPriority";

type TaskCardProps = {
    task: {
        title: string;
        description?: string;
        label?: string;
        tags?: string[];
        startDate: Date | null;
        endDate: Date | null;
        priority?: string;
        status: string;
    },
    handleUpdateTask: (updatedTask: any) => void,
}

const TaskCard = ({task, handleUpdateTask}: TaskCardProps) => {
    const [active, setActive] = useState(false);
    const [isEditing, setIsEditing] = useState(true);
    const [draftTask, setDraftTask] = useState(task);

    useEffect(() => {
        setDraftTask(task); // keep draft in sync with prop
    }, [task]);

    const handleFieldChange = (field: any, value: any) => {
        setDraftTask(prev => ({ ...prev, [field]: value }));
    }

    const handleClickAway = () => {
        // setDraftTask(task);
        // setIsEditing(false);
    }

    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleDelete = () => {}

    const handleSave = () => {
        handleUpdateTask(draftTask);
        setIsEditing(false);
    }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
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
        <TaskCheck isEditing={isEditing}/>
        <Box sx={{my:'9px'}}
        flexGrow={1}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        >
            <Box sx={{display: 'flex', alignItems:'flex-start', justifyContent:'space-between'}}>
                <TaskTitle 
                    title={draftTask.title}
                    isEditing={isEditing}
                    onChange={(val) => handleFieldChange('title', val)}
                />
                
                <Box 
                    display="flex"
                    sx={{
                        position: 'relative', mx:1
                    }}
                >
                        <TaskInfo 
                            active={active} 
                            isEditing={isEditing}
                            status={draftTask.status} 
                            label={draftTask.label}
                            onStatusChange={(val) => handleFieldChange('status', val)}
                            onLabelChange={(val) => handleFieldChange('label', val)}
                        />
                        <TaskButtons 
                            active={active}
                            isEditing={isEditing} 
                            handleEdit={handleEdit} 
                            handleDelete={handleDelete} 
                            handleSave={handleSave}
                        />
                </Box>
            </Box>
            
            <TaskDescription 
                active={active}
                isEditing={isEditing} 
                description={draftTask.description}
                onDescriptionChange={(val) => handleFieldChange('description', val)}
            />
        
            <Box sx={{display: 'flex', justifyContent:'space-between', alignContent: 'center'}}>
                <TaskDates
                    isEditing={isEditing}
                    startDate={draftTask.startDate}
                    dueDate={draftTask.endDate}
                    onStartDateChange={(val) => handleFieldChange('startDate', val)}
                    onDueDateChange={(val) => handleFieldChange('endDate', val)}
                />
                <Box display="flex" gap={1} sx={{mx: 1, alignItems: 'center'}}>
                    {task.tags?.map((tag) => (
                        <Chip key={tag} label={`#${tag}`} size="small" />
                    ))}
                    <TaskPriority
                        isEditing={isEditing}
                        priority={draftTask.priority}
                        onPriorityChange={(val) => handleFieldChange('priority', val)} 
                    />
                </Box>
            </Box>
        </Box>
    </Paper>
    </ClickAwayListener>
  )
}

export default TaskCard