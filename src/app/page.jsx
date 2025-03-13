import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-4xl font-bold'>Result Beautifier</h1>

      <div className='mt-10'>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='file'>Result</Label>
          <Input id='file' type='file' />
          <Button>Upload</Button>
        </div>
      </div>
    </div>
  );
}
