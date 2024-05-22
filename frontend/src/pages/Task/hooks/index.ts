import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import useModalStore from '../../../hooks/useModalStore'
import { TaskService } from '../../../services/Task'
import { ListTaskType } from '../../../types'

export const useTesting = () => {
  return useQuery({
    queryKey: ['tasksService.testing'],
    queryFn: async () => await TaskService.testing(),
  })
}

export const useGetAllTasks = () => {
  return useQuery({
    queryKey: ['tasksService.getAllTasks'],
    queryFn: async () => {
      const response = await TaskService.getAllTasks()
      return response
    },
  })
}

export const useCreateTask = () => {
  const queryClient = useQueryClient()
  const { closeModal } = useModalStore()
  return useMutation({
    mutationFn: async (values: ListTaskType) =>
      await TaskService.createTasks(values),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['tasksService.getAllTasks'],
      })
      closeModal()
    },
    onError: (err: AxiosError) => {
      console.log(err)
    },
  })
}
