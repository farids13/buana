'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactElement } from 'react';
import { FormProvider, useForm } from 'react-hook-form'
import Input from '../ui/input';
import { Button } from 'primereact/button';
import Image from 'next/image';
import { Dialog } from 'primereact/dialog';
import Cropper from 'react-easy-crop';
import { Slider } from 'primereact/slider';
import { useDownloadUserImage, useGetUserDetail } from '@/lib/api/user/get-user-detail';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileFormSchema } from '@/lib/validations/profile';
import getCroppedImg from '../../utils/crop-image-utils';
import { useRouter } from 'next/navigation';
import { useUploadImage } from '@/lib/api/storage/upload-file';
import { toast } from 'react-toastify';
import { useUpdateUserProfile } from '@/lib/api/user/update-user';

interface CroppedArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function ProfileForm():ReactElement {

  const {data:values} = useGetUserDetail();
  const getImg = useDownloadUserImage();
  const updateUser = useUpdateUserProfile();
  const methods = useForm({
    resolver: zodResolver(profileFormSchema),
    values,
    resetOptions: {
      keepDirtyValues: true,
    },
  });
  const { handleSubmit } = methods;

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { data: downloadedImage } = getImg;
  

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState<number>(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedArea | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const uploadImageMutation = useUploadImage(); 

  const onSubmit = handleSubmit(async (data) => {
    if (Boolean(selectedImage) && croppedImage) {
      try {
        const croppedBlob = await fetch(croppedImage).then((r) => r.blob());
        const file = new File([croppedBlob], `image-profile-${Date.now()}`, );
        
        const formData = new FormData();
        formData.append('file', file, file.name); 
  
        const resp = uploadImageMutation.mutateAsync(formData);

        resp.then((res) => {
          updateUser.mutate({name : data.name, phoneNumber: data.phoneNumber, imgUrl:res.id});
          setSelectedImage(null);
        }).catch((err) => {
          toast.error('Error uploading image');
        });

      } catch (error) {
        toast.error('Error uploading image');
      }
    }else{
      updateUser.mutate({name : data.name, phoneNumber: data.phoneNumber, imgUrl:data.imgUrl});
    }

  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setShowModal(false);
  };

  const onCropComplete = useCallback((croppedImg, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    if(selectedImage && croppedAreaPixels){
      try {
        const croppedImg = await getCroppedImg(
          selectedImage,
          croppedAreaPixels,
          rotation
        );
        
        if (!croppedImg) return;
        setCroppedImage(URL.createObjectURL(croppedImg));
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (e) {
        toast.error('Error cropping image');
      }
    }
    
    setShowModal(false);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();

      if(fileInputRef.current?.files?.[0])
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (values?.imgUrl) {
      getImg.mutate(); 
    }
  }, [values?.imgUrl]);

  useEffect(() => {
    if (downloadedImage instanceof Blob) {
      const objectUrl = URL.createObjectURL(downloadedImage);
      setCroppedImage(objectUrl);
    }
  }, [downloadedImage]);
  
  return (
    <FormProvider {...methods}>
        <form className="tw-space-y-8 !tw-my-8" onSubmit={(e: any) => {
          e.preventDefault();
          onSubmit()
            .then()
            .catch((err) => {toast.error('Error updating profile')});
        }}>
        <div className='flex tw-gap-10'>
          <div className='flex tw-flex-col tw-h-full'>
            <div className='tw-flex tw-flex-col tw-items-center image-container tw-gap-5 tw-rounded-xl tw-overflow-hidden tw-shadow-2xl' >
              <Image alt="avatar" height={250} src={ croppedImage ? croppedImage : "/img/user-default.jpg"} width={250}  /> 
            </div>
              <Button className='tw-mt-4' icon="pi pi-external-link" label="Change Image" onClick={handleButtonClick} type="button"/>
            <input
              accept='image/*'
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
              type='file'
            />
          </div>
          <div className='flex tw-flex-col tw-w-full'>
            <div className='tw-mt-7'>
              <Input float id="name" label="Name"/>
            </div>
            <div className='tw-mt-10'>
              <Input float id="phoneNumber" label="Phone Number"/>
            </div>
          </div>
        </div>
        <div className="tw-flex tw-mr-5 tw-justify-end tw-gap-4">
          <Button label="Save" outlined type="submit" />
          <Button label="Cancel" onClick={router.back} type="button"/>
        </div>

      </form>
      <Dialog
        className='tw-min-w-[300px] tw-min-h-[500px] tw-h-1/2 tw-w-1/2 tw-flex tw-flex-row'
        onHide={handleCloseModal}
        showHeader={false}
        visible={showModal}
      >
        <div className='tw-flex tw-flex-col tw-items-center'>
          <h2 className='tw-text-xl tw-mb-2'>Crop Image</h2>
          <div className='tw-w-full tw-flex tw-gap-3 tw-items-center'>
            <div className='tw-w-1/2 tw-flex tw-items-center tw-gap-5'>
              <span className='pi pi-sync'> </span>
              <Slider
                className='tw-w-[80%]'
                max={360}
                min={0}
                onChange={(e) => {setRotation(e.value as number)}}
                step={1}
                value={rotation}
              />
            </div>
            <div className='tw-w-1/2 tw-flex tw-items-center tw-gap-5'>
              <span className='pi pi-arrows-alt'> </span>
              <Slider
                className='tw-w-[80%]'
                max={4}
                min={1}
                onChange={(e) => {setZoom(e.value as number)}}
                step={0.1}
                value={zoom}
              />
            </div>
            <Button className='tw-min-w-fit' label="Crop" onClick={(e) => {handleCrop().then().catch((err) => {toast.error('Error cropping image')})}} />
          </div>
        </div>

        <div className='relative tw-h-[80%] tw-mt-4 tw-p-10'>
          <Cropper
            aspect={4/4}
            crop={crop}
            image={fileInputRef.current?.files?.[0] ? URL.createObjectURL(fileInputRef.current?.files?.[0]) : "/img/user-default.jpg"}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            rotation={rotation}
            zoom={zoom}
          />
        </div>
      </Dialog>
    </FormProvider>
  )
}

