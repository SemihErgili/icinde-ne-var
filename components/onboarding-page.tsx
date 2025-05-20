"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [gender, setGender] = useState("")
  const [age, setAge] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [targetWeight, setTargetWeight] = useState("")
  const [goal, setGoal] = useState("")
  const [activityLevel, setActivityLevel] = useState("")
  const [loading, setLoading] = useState(false)

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1)
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleComplete = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      router.push("/ana-sayfa")
    }, 1000)
  }

  const isStepComplete = () => {
    switch (step) {
      case 1:
        return gender !== "" && age !== ""
      case 2:
        return height !== "" && weight !== ""
      case 3:
        return targetWeight !== ""
      case 4:
        return goal !== ""
      case 5:
        return activityLevel !== ""
      default:
        return false
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm">
        <div className="mb-2">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium">Adım {step}/5</div>
            <div className="text-xs text-gray-500">Profil Kurulumu</div>
          </div>
          <div className\
