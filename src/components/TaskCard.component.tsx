import { Box, Chip, Paper } from "@mui/material"
import { useCallback, useEffect, useRef, useState } from "react";
import {
    TaskCheck,
    TaskTitle,
    TaskInfo,
    TaskButtons,
    TaskDescription,
    TaskDates,
    TaskPriority,
} from './card';
import TTask from "@/types/task";

type TaskCardProps = {
  task: TTask;
  handleUpdateTask: (updatedTask: TTask) => void;
  handleDelete: () => void;
};

const TaskCard = ({task, handleUpdateTask, handleDelete}: TaskCardProps) => {
    const [active, setActive] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [draftTask, setDraftTask] = useState(task);
    const [showEmptyTitleError, setShowEmptyTitleError] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        const target = event.target as HTMLElement;

        if (wrapperRef.current && !wrapperRef.current.contains(target)) {
          if (
            document.querySelector('[role="presentation"]')?.contains(target) ||
            target.closest('.MuiButtonBase-root') ||
            target.closest('.MuiYearCalendar-button')
          ) {
            return;
          }
          setDraftTask(task);
          setIsEditing(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [task]);

    useEffect(() => {
        setDraftTask(task);
    }, [task]);

    useEffect(() => {
      if (!isEditing) {
        setShowEmptyTitleError(false);
      }
    }, [isEditing]);


    const handleFieldChange = useCallback(
        <K extends keyof TTask>(field: K, value: TTask[K]) => {
            setDraftTask(prev => ({ ...prev, [field]: value }))
        }, [])

    const handleSave = () => {
        if (!draftTask.title.trim()) {
            setShowEmptyTitleError(true);
            const fixedTask = {...draftTask, title: task.title};
            handleUpdateTask(fixedTask);
        }else{
            setShowEmptyTitleError(false);
            handleUpdateTask(draftTask);
        }
        setIsEditing(false);
        setActive(false);
    }

  return (
    <Paper
        ref = {wrapperRef}
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
        <TaskCheck
            isEditing={isEditing}
            status={draftTask.status}
            onChange={(v) => handleFieldChange('status', v)}
        />

        <Box sx={{my:'9px', mx: '5px'}}
        flexGrow={1}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        >
            <Box sx={{display: 'flex', alignItems:'flex-start', justifyContent:'space-between'}}>
                <TaskTitle 
                    title={draftTask.title}
                    isEditing={isEditing}
                    onChange={(val) => handleFieldChange('title', val)}
                    showEmptyError={showEmptyTitleError}
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
                            labelId={draftTask.labelId}
                            onStatusChange={(val) => handleFieldChange('status', val)}
                            onLabelChange={(val) => handleFieldChange('labelId', val)}
                        />
                        <TaskButtons 
                            active={active}
                            isEditing={isEditing} 
                            handleEdit={() => setIsEditing(true)} 
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
        
            <Box 
                sx={{
                    display: 'flex',
                    justifyContent:'space-between', 
                    alignContent: 'center',
                    marginTop: (draftTask.startDate || draftTask.dueDate || draftTask.tags || draftTask.priority) ? 2 : 0,
                }}
            >
                <TaskDates
                    isEditing={isEditing}
                    startDate={draftTask.startDate}
                    dueDate={draftTask.dueDate}
                    onStartDateChange={(val) => handleFieldChange('startDate', val)}
                    onDueDateChange={(val) => handleFieldChange('dueDate', val)}
                />
                <Box display="flex" gap={1} sx={{mx: 1, alignItems: 'center'}}>
                    <Box display="flex" gap={0.5} sx={{mt:'-2px'}}>
                    {!isEditing && draftTask.tags?.slice(0, 4).map((tag) => (
                        <Chip key={tag} label={`#${tag}`} size="small" />
                    ))}
                    </Box>
                    <TaskPriority
                        isEditing={isEditing}
                        priority={draftTask.priority}
                        onPriorityChange={(val) => handleFieldChange('priority', val)} 
                    />
                </Box>
            </Box>
        </Box>
    </Paper>
  )
}

export default TaskCard