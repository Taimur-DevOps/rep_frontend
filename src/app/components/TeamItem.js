'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { userService } from '../Services/api';
import { toast } from 'react-hot-toast'; // Assuming you're using react-hot-toast

const TeamItem = ({ userId }) => {
  const [member, setMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchMember();
    }
  }, [userId]);

  const fetchMember = async () => {
    try {
      setIsLoading(true);
      const data = await userService.getUserById(userId);
      setMember(data);
    } catch (err) {
      setError('Failed to load team member');
      toast.error(`Failed to load team member: ${err.message || err}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="col-lg-4 col-md-6 mb-4">
      <div className="team-item skeleton-loading p-4">Loading...</div>
    </div>;
  }

  if (error) {
    return <div className="col-lg-4 col-md-6 mb-4">
      <div className="team-item error p-4 text-red-500">{error}</div>
    </div>;
  }

  if (!member) return null;

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="team-item shadow-sm rounded overflow-hidden">
        <div className="team-image">
          {member.images && member.images.length > 0 ? (
            <img 
              src={`${process.env.NEXT_PUBLIC_API_URL}/${member.images[0]}`} 
              alt={member.title} 
              className="img-fluid w-full h-64 object-cover"
            />
          ) : (
            <div className="placeholder-image bg-gray-200 h-64 flex items-center justify-center">
              No Image Available
            </div>
          )}
        </div>
        <div className="team-info p-4">
          <h3 className="team-name text-xl font-semibold">{member.title}</h3>
          <p className="team-position text-gray-600">{member.designation}</p>
          <div className="team-description mt-2 text-gray-700">
            <p>{member.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamItem;