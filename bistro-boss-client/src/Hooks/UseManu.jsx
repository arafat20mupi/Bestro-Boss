
import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";
const useManu = () => {
    const AxiosPublic = UseAxiosPublic()
    const { data: manu = [], isPending: loading, refetch } = useQuery({
        queryKey: ['manu'],
        queryFn: async () => {
            const res = await AxiosPublic.get('/manu')
            return res.data
        }
    })
    return [manu, loading, refetch];
}
export default useManu;